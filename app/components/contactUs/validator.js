const Joi = require('@hapi/joi');

exports.contactUs = () => Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
});
