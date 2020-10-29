const mongoose = require('mongoose');
var randomstring = require("randomstring");

const ProductTypeSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  name: {
    type: String,
    required: [true, 'name is required']
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

//module.exports = CategorySchema;
module.exports = mongoose.model('ProductType', ProductTypeSchema);