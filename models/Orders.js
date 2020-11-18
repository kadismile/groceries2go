
const mongoose = require('mongoose');
var randomstring = require("randomstring");


const addressSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  country: {
    type: String,
    required: [true, 'country is missing']
  },
  fullAddress: {
    type: String,
    required: [true, 'full address is missing']
  },
  countryCode: {
    type: String,
    required: [true, 'country code is missing']
  },
  longitude: {
    type: String,
    required: [true, 'longitude missing']
  },
  latitude: {
    type: String,
    required: [true, 'latitude missing']
  }

},{versionKey: false});
const orderItemsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  variantId: {
    type: String,
  },
  code: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    decimal: true
  },
  productId: {
    type: String,
  },
  productType: {
    type: String
  },
  productTypeId: {
    type: String
  },
  productVariantImage: {
    type: String
  },
},{versionKey: false});


const OrderSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  fullName: {
    type: String,
    required: [true, 'name is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  userNumber: {
    type: String,
  },
  shippingAddress: {
    type : addressSchema,
    required: [true, 'Please add an address']
  },
  salesAssigneeId: {
    type: String,
  },
  orderItems: {
    type: [orderItemsSchema],
    required: [true, 'Please add an order items']
  },
  orderTotal: {
    type: Number,
    decimal: true
  },
  itemTotal: {
    type: Number,
    decimal: true
  },
  shippingCost: {
    type: Number,
    decimal: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'not-paid'],
  },
  isApproved: {
    type: Boolean,
    default: false

  },
  shippingStatus: {
    type: String,
    enum: ['shipped', 'placed'],
  },
  shippedAt: {
    type: Date,
  },
  history: {
    type: Array,
    optional: true,
  },
  cancelledAt: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Order', OrderSchema);
