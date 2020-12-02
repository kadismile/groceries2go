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

exports.getUserOrders = async (req, res) => {
  const doc = req.body;

  try {
    const orders = await Orders.find({userId: doc.userId})
    res.status(200).json({
      status: "success",
      data: orders
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};