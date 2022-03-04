const Joi = require('@hapi/joi');

exports.getAllAdminWithPagination = () => Joi.object().keys({
  page: Joi.string().required(),
});

exports.sortingAdmin = () => Joi.object().keys({
  page: Joi.string().required(),
  orderby: Joi.string().required(),
  type: Joi.string().required(),
});

exports.deleteAdmin = () => Joi.object().keys({
  id: Joi.string().required(),
});

exports.searchAllAdmin = () => Joi.object().keys({
  query: Joi.string().required(),
});
