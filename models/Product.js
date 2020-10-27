const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {ProductBeforeSave} = require('./hooks/product_hooks');
const ProductSchema = mongoose.Schema({
  _id: {
    type: String,
    default: randomstring.generate(18)
  },
  name: {
    type: String,
    required: [true, 'Please Add product name']
  },
  description: {
    type: String,
    required: [true, 'Please Add description']
  },
  productTypeId: {
    type: String,
    required: [true, 'Please Add product type']
  },
  productType: {
    type: String,
    required: [true, 'Please Add product type']
  },
  status: {
    type: String,
    default: 'active',
    enum: ["acive", "inactive"]
  },
  productImage: {
    type: String,
    required: [true, 'add an image']
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

ProductSchema.pre("save", async function() {
  await ProductBeforeSave(this)
});

module.exports = mongoose.model('Product', ProductSchema);