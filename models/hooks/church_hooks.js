const bcrypt = require('bcryptjs');

exports.ChurchAfterUpdate = async (data, oldDoc, next) => {
  let newDoc = data.getUpdate().$set;
  if(oldDoc.name !== newDoc.name){
    try{
      await data.updateOne({ _id: oldDoc._id },
          {$push: {history: {
                event: "NAME_CHANGE",
                userId: oldDoc._id,
                oldValue: oldDoc.name,
                newValue: newDoc.name,
                createdAt: new Date()
              }}})
    }catch (e) {
      return next(e);
    }
  }
  if(oldDoc.address !== newDoc.address){
    try{
      await data.updateOne({ _id: oldDoc._id },
          {$push: {history: {
                event: "ADDRESS_CHANGE",
                userId: oldDoc._id,
                oldValue: oldDoc.address,
                newValue: newDoc.address,
                createdAt: new Date()
              }}
          })
    }catch (e) {
      return next(e);
    }
  }
  if(oldDoc.account.currentBalance !== newDoc.account.currentBalance){
    try{
      await data.updateOne({ _id: oldDoc._id },
          {$push: {history: {
                event: "ACCOUNT_BALANCE_CHANGE",
                userId: oldDoc._id,
                oldValue: oldDoc.account.currentBalance,
                newValue: newDoc.account.currentBalance,
                createdAt: new Date()
              }}
          })
    }catch (e) {
      return next(e);
    }
  }
  return next();
};

exports.ChurchBeforeCreate = async (data) => {
  
  let originalDoc = {...data._doc};
  
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  data.church_group = data._id;
  originalDoc.church_group = data._id;
  //create User
  await data.model('User').create(originalDoc);
  
  return data
};