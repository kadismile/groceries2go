import * as libphone from "google-libphonenumber";
import PNF from "google-libphonenumber";

const { PhoneNumberUtil } = libphone;

function validPhoneNumber (phoneNumber, countryCode) {
  try {
    if (!isValidPhoneNumber(phoneNumber, countryCode)) {
      return false;
    }
    return preparePhoneNumber(phoneNumber, countryCode);
  } catch (e) {
    return false;
  }
  
}

function preparePhoneNumber(phoneNumber, countryCode) {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phone = phoneUtil.parse(phoneNumber, countryCode);
  return !!phoneUtil.isValidNumber(phone);
}

function isValidPhoneNumber(phoneNumber, countryCode) {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phone = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.isValidNumber(phone);
  } catch (e) {
    return false
  }
}


export {validPhoneNumber}