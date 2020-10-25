const crypto = require('crypto');
const {errorHandler} = require("../utils/errors");
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductType = require('../models/ProductType');
const kue = require('kue');
const path = require("path");
const multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./public/uploads`)
  },
  filename: function(req, file, cb){
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 5);

exports.addProduct = async (req, res) => {
  try {
    //const doc = req.body;
    /*var validate = new Product(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }*/

    await uploadFiles(req, res, (err) => {
      res.status(200).json({
        status: 'success',
        data: "product"
      });
    });



    //const product = await Product.create(doc);



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

exports.createCategory = async (req, res) => {
  try {
    const doc = req.body;
    var validate = new Category(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    const categoryData = await Category.create(doc);
    res.status(201).json({
      status: "success",
      data: categoryData
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find()/*.select('name -_id')*/;
    res.status(200).json({
      status: "success",
      data: category
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.createProductType = async (req, res) => {
  try {
    const doc = req.body;
    var validate = new ProductType(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    const pType = await ProductType.create(doc);
    res.status(201).json({
      status: "success",
      data: pType
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.getProductType = async (req, res) => {
  try {
    const pType = await ProductType.find()/*.select('name -_id');*/
    res.status(200).json({
      status: "success",
      data: pType
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};
