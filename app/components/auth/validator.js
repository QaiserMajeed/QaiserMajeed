const Joi = require('@hapi/joi');

exports.register = () => Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  // company: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  advCode: Joi.string().required(),
  // userType: Joi.number(),
});

exports.resendOtp = () => Joi.object().keys({
  email: Joi.string().email().required(),
});

exports.verifyOTP = () => Joi.object().keys({
  email: Joi.string().required(),
  otp: Joi.number().integer().required(),
});

exports.login = () => Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.adminPortalLogin = () => Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.forgotPassword = () => Joi.object().keys({
  email: Joi.string().email().required(),
});

exports.resetPasswordLink = () => Joi.object().keys({
  token: Joi.string().required(),
});

exports.resetPassword = () => Joi.object().keys({
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().min(6).required(),
});

exports.resetPasswordParams = () => Joi.object().keys({
  token: Joi.string().required(),
});

exports.logout = () => Joi.object().keys({
  email: Joi.string().email().required(),
});

exports.checkLogin = () => Joi.object().keys({
  token: Joi.string().required(),
});

exports.registrationPayment = () => Joi.object().keys({
  token: Joi.string().required(),
  coupon: Joi.string().required(),
});

exports.loginPartner = () => Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
