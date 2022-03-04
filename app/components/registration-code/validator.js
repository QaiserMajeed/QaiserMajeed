const Joi = require('@hapi/joi');
const { pagination } = require('../../constants/validator');

const code = {
  code: Joi.string().required(),
  name: Joi.string().required(),
  availableCount: Joi.number().integer().required(),
};

const id = Joi.string().length(24).hex().required();

exports.create = () => Joi.object().keys(code);

exports.getCode = () => Joi.object().keys({ id });

exports.getCodes = () => Joi.object().keys(pagination);

exports.changeCode = () => Joi.object().keys({
  ...code,
  codeId: id,
});

exports.checkCode = () => Joi.object().keys({
  code: Joi.string().required(),
});

exports.deleteCodes = () => Joi.object().keys({
  ids: Joi.array().items(Joi.string().length(24).hex()).min(1).required(),
});
