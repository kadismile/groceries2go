require('dotenv').config();
const seeder = require('mongoose-seed');
const randomstring = require("randomstring");


seeder.connect(process.env.DB_CONNECTION, function() {
  // Load Mongoose models
  seeder.loadModels(['models/DocumentNumber.js']);
  seeder.populateModels(data, function() {
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
    'model': 'DocumentNumber',
    'documents': [
      {
        '_id': randomstring.generate(18),
        'documentType': 'users',
        'nextSeqNumber': 10000001
      }
    ]
  }
];