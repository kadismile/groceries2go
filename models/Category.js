const mongoose = require('mongoose');
var randomstring = require("randomstring");

const CategorySchema = mongoose.Schema({
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
  church_group: {
    type: String,
    required: [true, 'category Must be under a church group']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{versionKey: false});

//module.exports = CategorySchema;
module.exports = mongoose.model('Category', CategorySchema);