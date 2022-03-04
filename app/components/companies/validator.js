const Joi = require('@hapi/joi');

exports.createCompany = () => Joi.object().keys({
  company_name: Joi.string().required(),
  owner: Joi.string().required(),
});
