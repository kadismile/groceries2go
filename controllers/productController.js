const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
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
const field = require('../utils/fields')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./public`)
  },
  filename: async function(req, file, cb){
    await Filesystem.deleteMany({})
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
    res.status(200).json({
      status: "success",
      data: res.advancedResults.data
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
    console.log(typeof  doc)
    console.log(doc)
    if(typeof doc === "object") {
      doc.forEach( async (_id) => {
        await Product.deleteOne({ _id })
      })
      res.status(200).json({
        status: "success",
      })
    } else {
      const product = await Product.findOne({_id: doc._id})
      await Product.deleteOne({_id: product._id})
      res.status(200).json({
        status: "success",
      })
    }

  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const doc = req.body
    const data = {}
    data.name = doc.name
    data.description = doc.description
    data.productTypeId = doc.productTypeId
    data.productType = doc.productType
    data.categoryId = doc.categoryId
    data.category = doc.category
    await Product.findByIdAndUpdate(doc._id, data)
    res.status(200).json({
      status: "Success",
    });

    console.log(doc)
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
        if (product.productImage) {
          if (fs.existsSync(`./public/${product.productImage}`)) {
            await fs.unlinkSync(`./public/${product.productImage}`)
          }
        }
        const data = { productImage: productImage[0].name }
        await Product.findByIdAndUpdate(doc._id, data)
        await Filesystem.deleteMany({})
      } else {
        const productVariant = await ProductVariant.findOne({ _id: doc._id })
        if (productVariant.productVariantImage) {
          if (fs.existsSync(`./public/${productVariant.productVariantImage}`)) {
            await fs.unlinkSync(`./public/${productVariant.productVariantImage}`)
          }
        }

        const data = { productVariantImage: productImage[0].name }
        await ProductVariant.findByIdAndUpdate(doc._id, data)
        await Filesystem.deleteMany({})
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

exports.deleteVariant= async (req, res) => {
  try {
    const doc = req.body;
    await ProductVariant.deleteOne({ _id: doc._id});
    res.status(200).json({
      status: "success"
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.updateVariant= async (req, res) => {
  try {
    const doc = req.body;
    console.log("BODY ___", req.body)
    let pvDoc = {}
    pvDoc.productId = doc.productId
    pvDoc.name = doc.name
    pvDoc.description = doc.description
    pvDoc.price = doc.price
    pvDoc.code = doc.code
    pvDoc.quantityInCase = doc.quantityInCase
    pvDoc.inventory = doc.inventory
    pvDoc.uom = doc.uom
    pvDoc.upc = doc.upc
    console.log("pvDoc __", pvDoc)
    await ProductVariant.findByIdAndUpdate(doc._id, pvDoc)
    res.status(200).json({
      status: "success"
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

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
    res.status(200).json({
      status: "success",
      data: res.advancedResults.data
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.updateCategory = async (req, res) => {
  try {
    const doc = req.body
    await Category.findByIdAndUpdate(doc._id, doc)
    res.status(200).json({
      status: "success"
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.updateProductType = async (req, res) => {
  try {
    const doc = req.body
    await ProductType.findByIdAndUpdate(doc._id, doc)
    res.status(200).json({
      status: "success"
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.uploadCategoryCsv = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let csvFile = await Filesystem.find({})
      await CSVToJSON().fromFile(`./public/${csvFile[0].name}`)
        .then(async (categories) => {
          categories.forEach(async (cat)=> {
            await Category.create(cat)
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

exports.uploadProductCsv = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let csvFile = await Filesystem.find({})
      await CSVToJSON().fromFile(`./public/${csvFile[0].name}`)
        .then(async (products) => {
          products.forEach(async (product)=> {
              await Category.create(product)
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

exports.uploadVariantCsv = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let csvFile = await Filesystem.find({})
      await CSVToJSON().fromFile(`./public/${csvFile[0].name}`)
        .then(async (variants) => {
          variants.forEach(async (pVariant)=> {
            let product = await Product.findOne({_id: pVariant.productId})
            if (product) {
              await ProductVariant.create(pVariant)
              await Filesystem.deleteMany({})
              await fs.unlinkSync(`./public/${csvFile[0].name}`)
            }
          })
        }).catch(err => {
          console.log(err);
          res.status(403).json({
            status: "failed"
          })
        });

      setTimeout(()=>
        res.status(200).json({
          status: "success"
        }), 3000)


    }), 100)
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }

};

exports.uploadProductTypeCsv = async (req, res) => {
  try {
    await setTimeout(()=> uploadFiles(req, res, async (err) => {
      let csvFile = await Filesystem.find({})
      await CSVToJSON().fromFile(`./public/${csvFile[0].name}`)
        .then(async (productTypes) => {
          productTypes.forEach(async (pt)=> {
            await ProductType.create(pt)
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

/*#### MOBILE_APP API's
* #######################
* */

exports.getRandomProducts = async (req, res) => {
  try {
    const products = await ProductVariant.Random()
    res.status(200).json({
      status: "success",
      data: products
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.getProductVariants = async (req, res) => {
  let productTypeId = req.params.categoryId
  try {
    const products = await ProductVariant.find({productTypeId}).limit(25)
    res.status(200).json({
      status: "success",
      data: products
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.getVariants = async (req, res) => {
  try {
    const productId = req.params.productId
    console.log(productId)
    const product = await Product.findOne({ _id: productId})
    const productVariants = await ProductVariant.find({productId: product._id})

    res.status(200).json({
      status: "success",
      data: {...product._doc, productVariants}
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.getVariantsById = async (req, res) => {
  try {
    const variantId = req.params.variantId
    const productVariant = await ProductVariant.findOne({_id: variantId})
    let productVariants
    let XproductVariants
    if (productVariant) {
      productVariants = await ProductVariant.find({ productId: productVariant.productId})
      XproductVariants = productVariants.filter((variant) => variant._id !== variantId)
    }

    res.status(200).json({
      status: "success",
      data: {...productVariant._doc, productVariants: XproductVariants}
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.getProductsByTypeId = async (req, res) => {
  try {
    const productTypeId = req.params.productTypeId
    const product = await Product.find({productTypeId}).limit(10)
    res.status(200).json({
      status: "success",
      data: product
    })
  } catch (e) {
    /*console.log(`${e}`.red);*/
    errorHandler(e, res);
  }
};

exports.searchService = async (req, res) => {

  const client = new MongoClient(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
  });

  const doc = req.body
  let query = doc.query
  let type = doc.type
  let searchTerm = doc.searchTerm
  let limit = 50;
  if (query.limit ) {
    limit = parseInt(limit, 10);
    delete query.limit
  }

  try {
    await client.connect();
    const db = await client.db("groceries2g0");
    const fields = field[type] || [];

    let method;
    if (!isPhone(searchTerm) && !(/^[a-zA-Z]+$/).test(Number(searchTerm)) || ifNumberSearch(searchTerm) ) {
      method = {
        near: {
          path: fields,
          origin: Number(searchTerm),
          "pivot": 2
        }
      };
    } else {
      method = {
        text: {
          query: searchTerm,
          path: fields,
          fuzzy: { maxEdits: 2, prefixLength: 2 },
          score: {boost: { value: 2 },},
        },
      }
    }

    res.status(200).json({
      status: "success",
      data: await db
        .collection(`${type}`)
        .aggregate([
          {
            '$search': {
              ...method
            }
          },
          { $match: query },
          {
            $limit: limit
          },
        ])
        .toArray()
    })

  } catch (error) {
    console.log("An error fetching", error.message);
  }
}

exports.populateProductVariants = async (req, res) => {
  let productVariants = await ProductVariant.find({})
  productVariants.forEach( async (pV)=> {
    let productId = pV.productId
    let product = await Product.findOne({ _id: productId, productType: {$exists: true} })
    if (product) {
      pV.productType = product.productType
      pV.productTypeId = product.productTypeId
      await ProductVariant.findByIdAndUpdate(pV._id, pV)
      if (pV.productType) {
        console.log("PV ",  await ProductVariant.findOne({_id: pV._id}))
      }
    }
  })
}

function isPhone(searchTerm) {
  return searchTerm.length > 10 && (/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g).test(searchTerm);
}

function ifNumberSearch(searchTerm) {
  return /^\d+$/.test(searchTerm)
}

