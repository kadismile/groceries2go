const mongoose = require('mongoose');
const randomstring = require("randomstring");

const FileSystemSchema = mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
  },
  collectionId: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },

},{versionKey: false});


module.exports = mongoose.model('Filesystem', FileSystemSchema);