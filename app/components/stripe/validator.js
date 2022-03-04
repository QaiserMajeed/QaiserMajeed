const Joi = require('@hapi/joi');

exports.createCustomer = () => Joi.object().keys({
  email: Joi.string().email().required(),
});

exports.createSubscription = () => Joi.object().keys({
  customerId: Joi.string().required(),
  priceId: Joi.string().required(),
});

exports.getSubscriptions = () => Joi.object().keys({
  customerId: Joi.string().required(),
});

exports.getCustomer = () => Joi.object().keys({
  id: Joi.string().required(),
});
