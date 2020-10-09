const bcrypt = require('bcryptjs');

exports.UserAfterUpdate = async (data, next) => {
  const newDoc = data.getUpdate();
  const oldDoc = await data.model.findOne(data.getQuery());
    
    if(newDoc.name && oldDoc.fullName !== newDoc.fullName){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$addToSet: {history: {
            event: "NAME_CHANGE",
            oldValue: oldDoc.name,
            newValue: newDoc.name,
            createdAt: new Date()
              }}})
      }catch (e) {
        return next(e);
      }
    }
    if(newDoc.address && oldDoc.address !== newDoc.address){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$addToSet: {history: {
            event: "ADDRESS_CHANGE",
            oldValue: oldDoc.address,
            newValue: newDoc.address,
            createdAt: new Date()
              }}
          })
      }catch (e) {
        return next(e);
      }
    }
    if(newDoc.password && oldDoc.password !== newDoc.password){
    try{
      const salt = await bcrypt.genSalt(10);
      newDoc.password = await bcrypt.hash(newDoc.password, salt);
      await data.updateOne({ _id: oldDoc._id },
          {
            password: newDoc.password,
            $addToSet: {
              history: {
                event: "PASSWORD_CHANGE",
                createdAt: new Date()
              }
            }
          })
    }catch (e) {
      return next(e);
    }
  }
    return next();
};

exports.UserBeforeSave = async (data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }
  data.userNumber = await data.model('DocumentNumber').getNextSequenceValue("users")
  return data
}