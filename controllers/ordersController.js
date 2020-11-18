const Orders = require('../models/Orders');
const {errorHandler} = require("../utils/errors");

exports.createOrder = async (req, res) => {
  try {
    await Orders.create(req.body)
    res.status(200).json({
      status: "success",
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};