const Joi = require('@hapi/joi');

exports.create = () => Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  easyToAsk: Joi.number().required(),
  peopleIChoose: Joi.number().required(),
  financialSatisfied: Joi.number().required(),
  financialDecisions: Joi.number().required(),
  ableToUnderstand: Joi.number().required(),
  financialAsking: Joi.number().required(),
  financialHelp: Joi.number().required(),
  financialDiffers: Joi.number().required(),
  adapt: Joi.number().required(),
  moneyPressure: Joi.number().required(),
  thinkingDecisions: Joi.number().required(),
  feelGrateful: Joi.number().required(),
  outlook: Joi.number().required(),
});





