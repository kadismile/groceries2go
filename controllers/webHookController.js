const {errorHandler} = require("../utils/errors");
const User = require('../models/User');

exports.webhooktest = async (req, res, next) => {
  try {
    const doc = req.body;
    console.log("DOC:", JSON.stringify(doc));
    res.status(201).json({
      success: true,
      doc
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};
