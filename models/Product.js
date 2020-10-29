const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {ProductBeforeSave} = require('./hooks/product_hooks');
const ProductSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
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
    enum: ["active", "inactive"]
  },
  productImage: {
    type: String
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