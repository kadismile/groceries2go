exports.constants = {
  DB_CONNECTION:process.env.DB_CONNECTION,
  NODE_ENV: process.env.NODE_ENV,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
  FROM_NAME: process.env.FROM_NAME,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_ACCESS_SECRET: process.env.S3_ACCESS_SECRET,
  S3_BUCKET: process.env.S3_BUCKET,
}


//const  {monnify}  = require("./../integrations/monnify");