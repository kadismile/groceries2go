const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {errorHandler} = require("../utils/errors");

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Make sure token exists
    if (!token) {
      return next(errorHandler('Not authorized to access this route', res));
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: decoded._id});

    next();
  } catch (err) {
    return next(errorHandler(err, res));
  }
};


// Grant access to specific roles
exports.authorize = (roles) => {
  
  return (req, res, next) => {
    if (!req.user) return;
    let avaRoles = roles.filter((value)=> (req.user.roles).includes(value));
    if (avaRoles.length !== 0) {
      next();
    } else {
      return next(
          errorHandler(
          `Not authorized to access this route`,
          res
        )
      );
    }
  };
};
