const mongoose = require('mongoose');
const randomstring = require("randomstring");

const DocumentNumberSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  documentType: {
    type: String
  },
  nextSeqNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

},{versionKey: false});


DocumentNumberSchema.statics.getNextSequenceValue = async function (documentType) {
  let value = await this.findOneAndUpdate({ documentType: documentType },
    { $inc: { nextSeqNumber: 1 }
    }, {new: true })
  return value.nextSeqNumber
};



module.exports = mongoose.model('DocumentNumber', DocumentNumberSchema);