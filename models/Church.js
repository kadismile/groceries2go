const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {ChurchBeforeCreate} = require('./hooks/church_hooks');
const categorySchema = require('./Category');

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
    type: Number,
    required: [true, 'longitude missing']
  },
  latitude: {
    type: String,
    required: [true, 'latitude missing']
  }
  
},{versionKey: false});


const churchAccount = mongoose.Schema({
  currentBalance: {
    type: Number,
    decimal: true,
    default: function() {
      return 0
    }
  },
},{versionKey: false});

const ChurchSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  address: {
    type : [addressSchema],
    required: [true, 'Address properties are missing']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Please Add Gender']
  },
  dob: {
    type: Date
  },
  maritalStatus: {
    type: String,
    enum: ['married', 'single'],
    required: [true, 'Please Add marital status']
  },
  password: {
    type: String,
    select: false, //dont show the password
    min: [6, 'password too short'],
    
  },
  roles: {
    type : Array ,
    default : [],
    optional: true,
  },
  category: {
    type : Array ,
    default : [],
    optional: true,
  },
  history: {
    type: Array,
    optional: true,
  },
  superAdmin: {
    type: Boolean,
    default: function() {
      return true;
    }
  },
  account: {
    type: {churchAccount},
  },
  church_group: {
    type: String,
    min: [6, 'group too short'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{versionKey: false});

//this is the hook after insert
ChurchSchema.post("save", async function(doc) {

});

ChurchSchema.pre("save", async function() {
  await ChurchBeforeCreate(this)
});
module.exports = mongoose.model('Church', ChurchSchema);