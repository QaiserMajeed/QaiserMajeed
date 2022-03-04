const Joi = require('@hapi/joi');

exports.createDiscoverIdentity = () => Joi.object().keys({
  identities: Joi.array().items(
    Joi.array().items(Joi.object().keys()),
  ).min(3).required(),
});

exports.createDiscoverImpact = () => Joi.object().keys({
  impacts: Joi.array().items(
    Joi.array().items(Joi.object().keys()),
  ).min(9).required(),
});

exports.getImpactById = () => Joi.object().keys({
  id: Joi.string().required(),
});
