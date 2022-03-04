const Joi = require('@hapi/joi');

exports.newRegistrationCode = () => Joi.object().keys({
  code: Joi.string().required(),
  companyId: Joi.string().required(),
  owner: Joi.string().required(),
  title: Joi.string(),
  initialCount: Joi.number().integer().required(),
});
