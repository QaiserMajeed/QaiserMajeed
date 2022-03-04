const Joi = require('@hapi/joi');
const { pagination, id } = require('../../constants/validator');

exports.addPartner = () => Joi.object().keys({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  advCode: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
  customerId: Joi.string().required(),
});

exports.search = () => Joi.object().keys(pagination);

exports.getOne = () => Joi.object().keys({ id: id.required() });

exports.changePartner = () => Joi.object().keys({
  initialRegistrationsLimit: Joi.number().min(20).required(),
  id: id.required(),
});
