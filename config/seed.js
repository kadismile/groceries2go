require('dotenv').config();
const seeder = require('mongoose-seed');
const randomstring = require("randomstring");


seeder.connect(process.env.DB_CONNECTION, function() {
  // Load Mongoose models
  seeder.loadModels(['models/DocumentNumber.js', 'models/User.js']);
  seeder.populateModels(userData, function() {
    seeder.disconnect();
  });

  // Clear specified collections
  /*seeder.clearModels(['DocumentNumber'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });*/
});



const data = [
  {
    "model": "DocumentNumber",
    "documents": [
      {
        '_id': randomstring.generate(18),
        'documentType': 'users',
        'nextSeqNumber': 10000001
      }
    ]

  }
]

const userData = [
  {
    'model': 'User',
    'documents': [
      {
        "fullName": "Ibrahim Abubakar",
        "phoneNumber": "07067875047",
        "userType": "customer",
        "accountBalance": 0,
        "password": "111222333",
        "email": "brianking319@gmail.com",
        "address": {
          "countryCode": "NG",
          "latitude": 9.0323,
          "longitude": 7.4692,
          "fullAddress": "manzini street wuse zone 4 Abuja",
          "country": "Nigeria"
        }
      },
      {
        "fullName": "Damy Design",
        "phoneNumber": "07067875047",
        "userType": "customer",
        "accountBalance": 0,
        "password": "111222333",
        "email": "dammy@gmail.com",
        "address": {
          "countryCode": "NG",
          "latitude": 9.0323,
          "longitude": 7.4692,
          "fullAddress": "ikota lagos",
          "country": "Nigeria"
        }
      }
    ]
  }
];