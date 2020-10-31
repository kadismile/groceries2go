const fs = require('fs')
const randomstring = require("randomstring");
const {errorHandler} = require("../utils/errors");
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariants');
const Category = require('../models/Category');
const ProductType = require('../models/ProductType');
const Filesystem = require('../models/Filesystem');
const kue = require('kue');
const path = require("path");
const multer = require("multer");
const CSVToJSON = require('csvtojson');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./public`)
  },
  filename: async function(req, file, cb){
    const _id =  randomstring.generate(18)
    const name = _id + path.extname(file.originalname)
    let image = await Filesystem.create({ _id, name, collections: "products" })
    cb(null,  image._id + path.extname(file.originalname));
  },
});
const uploadFiles = multer({ storage: storage }).array("file");

exports.addProduct = async (req, res) => {
  try {
    let doc = req.body;
    /*
    const validate = new Product(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }*/

    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let doc = req.body;
      let productImages = await Filesystem.find({}).sort({"uploadedAt" : -1})
      let {productVariants} = doc
      doc.productImage = productImages[0].name;
      productVariants = JSON.parse(productVariants)
      const product =  await Product.create(doc);
      if (product) {
        productImages.shift()
        productImages.forEach( async (pI, index)=> {
          productVariants[index].productVariantImage = pI.name
          productVariants[index].productId = product._id
          await ProductVariant.create(productVariants[index])
        })
        await Filesystem.deleteMany({})
        res.status(201).json({
          status: 'Success',
          data: product
        });
      }
    }), 100)

  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find()/*.select('name -_id');*/
    res.status(200).json({
      status: "success",
      data: product
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await Product.findOne({_id: productId})
    const productVariants = await ProductVariant.find({productId: product._id})

    /*.select('name -_id');*/
    res.status(200).json({
      status: "success",
      data: {...product._doc, productVariants}
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.deleteProduct = async (req, res) => {
  try {
    const doc = req.body
    const product = await Product.findOne({_id: doc._id})
    const productVariant = await ProductVariant.find({productId: product._id})

    /*.select('name -_id');*/
    res.status(200).json({
      status: "success",
      data: {...product._doc, productVariant}
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const doc = req.body

    await Product.updateOne({_id: doc._id, $set: doc})
    doc.productVariants.forEach( async (pv)=> {
      await ProductVariant.updateOne({_id: pv._id, $set: pv})
    })

    res.status(200).json({
      status: "Success",
    });

    console.log(doc)
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

exports.updateImages = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let doc = req.body;
      let productImage = await Filesystem.find({})

      if (doc.collection && doc.collection === "product") {
        const product = await Product.findOne({_id: doc._id})
        await Product.updateOne(
          {_id: product._id,
            $set: { productImage: productImage[0].name }
          })
        await Filesystem.deleteMany({})
        await fs.unlinkSync(`./public/${product.productImage}`)
      } else {
        const productVariant = await ProductVariant.findOne({ _id: doc._id })
        await ProductVariant.updateOne(
          {_id: productVariant._id,
            $set: {productVariantImage: productImage[0].name }
          })
        await Filesystem.deleteMany({})
        await fs.unlinkSync(`./public/${productVariant.productVariantImage}`)
      }

      res.status(200).json({
        status: "success",
        data: productImage
      })

    }), 100)

  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.uploadProductCsv = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let csvFile = await Filesystem.find({})
      await CSVToJSON().fromFile(`./public/${csvFile[0].name}`)
        .then(async (products) => {
          products.forEach(async (product)=> {
            let productType = await ProductType.findOne({_id: product.productTypeId})
            let category = await Category.findOne({_id: product.categoryId})
            if (productType && category) {
              product.category = category.name
              product.productType = productType.name
              await Product.create(product)
            }
          })
          await Filesystem.deleteMany({})
          await fs.unlinkSync(`./public/${csvFile[0].name}`)
        }).catch(err => {
        console.log(err);
      });

      setTimeout(()=> res.status(200).json({
        status: "success"
      }), 3000)


    }), 100)
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};


