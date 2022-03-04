const Joi = require('@hapi/joi');
const { pagination } = require('../../constants/validator');

exports.getProfiles = () => Joi.object().keys(pagination);

exports.getProfileById = () => Joi.object().keys({
  id: Joi.string().length(24).hex().required(),
});
