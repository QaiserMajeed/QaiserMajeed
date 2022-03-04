const Joi = require('@hapi/joi');

module.exports = {
  pagination: {
    skip: Joi.number(),
    limit: Joi.number().max(100),
    search: Joi.string().allow(''),
  },
  id: Joi.string().length(24).hex(),
};
