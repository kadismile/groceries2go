const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {ProductBeforeSave} = require('./hooks/product_hooks');
const ProductVariantSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  productId: {
    type: String,
    required: [true, 'Please Add productId']
  },
  name: {
    type: String,
    required: [true, 'Please Add product name']
  },
  description: {
    type: String,
    required: [true, 'Please Add description']
  },
  price: {
    type: Number,
    required: [true, 'Please Add price']
  },
  code: {
    type: String,
    required: [true, 'Please Add code']
  },
  uom: {
    type: String
  },
  upc: {
    type: String
  },
  quantityInCase: {
    type: Number
  },
  inventory: {
    type: Number,
    required: [true, 'Please Add inventory']
  },
  status: {
    type: String,
    default: 'active',
    enum: ["active", "inactive"]
  },
  productVariantImage: {
    type: String
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  productTypeId: {
    type: String,
    //required: [true, 'Please Add product type']
  },
  productType: {
    type: String,
    //required: [true, 'Please Add product type']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

},{versionKey: false});

ProductVariantSchema.statics.Random = async function() {
  const count = await this.countDocuments();
  const rand = Math.floor(Math.random() * count);
  return  await this.find().skip(rand).limit(10);
};

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);