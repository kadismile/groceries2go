const PNF = require('google-libphonenumber').PhoneNumberFormat;
const PhoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const {errorHandler} = require("../utils/errors");

module.exports.prepareValidPhoneNumber = (phoneNumber, countryCode, res) =>{
  if (!isValidPhoneNumber(phoneNumber, countryCode)) {
    errorHandler({ message: `An invalid phone number ${phoneNumber} was provided`, statusCode: 406 }, res)
  }
  return preparePhoneNumber(phoneNumber, countryCode);
};

function preparePhoneNumber(phoneNumber, countryCode) {
  const phoneUtil = PhoneNumberUtil;
  const phone = phoneUtil.parse(phoneNumber, countryCode);
  if (phoneUtil.isValidNumber(phone)) {
    return phoneUtil.format(phone, PNF.E164)
  } else {
    return false
  }
}

function isValidPhoneNumber(phoneNumber, countryCode) {
  const phoneUtil = PhoneNumberUtil;
  const phone = phoneUtil.parse(phoneNumber, countryCode);
  return phoneUtil.isValidNumber(phone);
}