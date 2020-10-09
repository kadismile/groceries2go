const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();
const env = process.env.NODE_ENV;


let connectDB;
if (env === 'development') {
   connectDB = async() => {
    const conn = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
     console.log(`MongoDB Connected to ${env} Database: ${conn.connection.host}`.cyan.underline.bold)
  };
}

if (env === 'test') {
  connectDB = async() => {
    const uri = await mongod.getConnectionString();
    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };
    await mongoose.connect(uri, mongooseOpts);
  };
  console.log(`MongoDB Connected to ${env} Database`.cyan.underline.bold)
}
module.exports = connectDB;
