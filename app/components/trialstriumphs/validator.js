const Joi = require("@hapi/joi");
const trialstriumpsConstants = require("../../constants/align");

exports.update = () =>
  Joi.object().keys({
    field: Joi.string()
      .valid(...Object.values(trialstriumpsConstants))
      .required(),
    value: Joi.alternatives().conditional("field", {
      is: trialstriumpsConstants.completed,
      then: Joi.boolean().required(),
      otherwise: Joi.array().min(1).required(),
    }),
  });

exports.create = () =>
  Joi.object().keys({
    trials: Joi.array().items(Joi.string().allow("")).min(1).required(),
    triumphs: Joi.array().items(Joi.string().allow("")).min(1).required(),
    importantTrials: Joi.array()
      .items(Joi.string().allow(""))
      .min(1)
      .required(),
    importantTriumphs: Joi.array()
      .items(Joi.string().allow(""))
      .min(1)
      .required(),
    completed: Joi.boolean().required(),
  });
