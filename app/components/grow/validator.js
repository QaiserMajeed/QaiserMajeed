const Joi = require('@hapi/joi');
const growConstants = require('../../constants/grow');
const { getSituations } = require('./service');

const template = Joi.array().items(
  Joi.object().keys({
    key: Joi.string().allow('').required(),
    value: Joi.number().required(),
  }),
)
  .min(1)
  .required();

const situations = getSituations(template);

exports.create = () => Joi.object().keys({
  // name: Joi.string().min(1).required(),
  // email: Joi.string().min(1).email().required(),
  situations: Joi.object().keys({
    ...situations,
  }).required(),
  completed: Joi.boolean().required(),
});

exports.updateField = () => Joi.object().keys({
  field: Joi.string().valid(...Object.values(growConstants.fields)).required(),
  // field: Joi.string().valid(...Object.values(growConstants.fields.completed)).required(),
  value: Joi.alternatives()
    .conditional('field', [
      // {
      //   is: growConstants.fields.name,
      //   then: Joi.string(),
      // },
      // {
      //   is: growConstants.fields.email,
      //   then: Joi.string().email(),
      // },
      {
        is: growConstants.fields.completed,
        then: Joi.boolean(),
        otherwise: template,
      },
    ])
    .required(),
});

exports.getSituations = () => Joi.object().keys({
  situation: Joi.string().valid(...growConstants.situations).required(),
});
