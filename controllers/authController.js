const  {constants}  = require("../utils/constants");
const crypto = require('crypto');
const {errorHandler} = require("../utils/errors");
const User = require('../models/User');
const Church = require('../models/Church');
const {prepareValidPhoneNumber} = require("../utils/helpers");
const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const kue = require('kue');
const queue = kue.createQueue();


exports.addUser = async (req, res) => {
  try {
    const doc = req.body;
    var validate = new User(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    doc.phoneNumbers = [prepareValidPhoneNumber(doc.phoneNumber, doc.address.countryCode, res)];
    const user = await User.create(doc);
    
    let userData = {...user._doc};
    delete userData.password;
    
    res.status(200).json({
      status: 'success',
      data: userData
    });
    
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.updateUser = async (req, res) => {
  const doc = req.body;
  
  const user = await User.findByIdAndUpdate(doc.userId, doc, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    status: "success",
    data: user
  });
};

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).json({
      type: "login",
      status: "failed",
      data: "Please provide an email and password"
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      res.status(401).json({
        type: "login",
        statusCode: 401,
        data: "Invalid credentials"
      });
    }
    
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      res.status(401).json({
        type: "login",
        status: "failed",
        data: "Invalid credentials"
      });
    } else {
  
      sendTokenResponse(user, 200, res)
    }
  } catch (e) {
    return errorHandler(e, res);
  }
};

exports.forgotPassword = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      res.status(404).json({
        status: "failed",
        data: "There is no user with that email"
      });
    }
    
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/auth/resetpassword/${resetToken}`;
    
    queue
        .create("forgotEmailPasswordJob", {
          email: user.email,
          subject: 'Password reset token',
          resetUrl
        })
        .priority("high")
        .save();
        sendEmail();
    res.status(200).json({ status: "success", data: 'Email sent' });
  } catch (e) {
    
    console.log("error", e)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save({ validateBeforeSave: false });
  
    return new ErrorResponse('Email could not be sent', 500);
  }
};

exports.resetPassword = async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }
  
  // Set new password
  let update = {};
  update.password = req.body.password;
  update.resetPasswordToken = "";
  update.resetPasswordExpire = "";
  
  await User.findOneAndUpdate({ resetPasswordToken, ...update });
  
  res.status(200).json({
    status: "success",
    message: "Password reset was successful"
  });
};


const sendTokenResponse = async(user, statusCode, res) => {
  // Create token
  const token = await user.getSignedJwtToken();
  const options = {
    expires: new Date(
        Date.now() + constants.JWT_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  
  if (constants.NODE_ENV === 'production') {
    options.secure = true;
  }
  
  res
      .status(statusCode)
      .json({
        status: "success",
        token,
      });
};