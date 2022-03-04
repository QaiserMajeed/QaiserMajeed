const Joi = require('@hapi/joi');
const impactConstants = require('../../constants/impact');

const completed = Joi.boolean();

const lifePurpose = Joi.object().keys({
  completed,
  year: Joi.string().allow('').required(),
  city: Joi.string().allow('').required(),
  familyClass: Joi.string().allow('').required(),
  familyRelations: Joi.string().allow('').required(),
  immediateFamily: Joi.string().allow('').required(),
  college: Joi.string().allow('').required(),
  major: Joi.string().allow('').required(),
  industry: Joi.string().allow('').required(),
  position: Joi.string().allow('').required(),
  childLove: Joi.string().allow('').required(),
  career: Joi.string().allow('').required(),
  momInspired: Joi.string().allow('').required(),
  momTaught: Joi.string().allow('').required(),
  dadInspired: Joi.string().allow('').required(),
  dadTaught: Joi.string().allow('').required(),
  parentsLesson: Joi.string().allow('').required(),
  adultDecision: Joi.string().allow('').required(),
  adversity: Joi.string().allow('').required(),
  talent1: Joi.string().allow('').required(),
  talent2: Joi.string().allow('').required(),
  talent3: Joi.string().allow('').required(),
  teachAbout: Joi.string().allow('').required(),
  improveArea: Joi.string().allow('').required(),
  mainPassion: Joi.string().allow('').required(),
  passion1: Joi.string().allow('').required(),
  passion2: Joi.string().allow('').required(),
  passion3: Joi.string().allow('').required(),
  peopleHelp: Joi.string().allow('').required(),
  helpReason: Joi.string().allow('').required(),
  purposeVerb: Joi.string().allow('').required(),
  purposeComponent: Joi.string().allow('').required(),
  purposeStatement: Joi.string().allow('').required(),
  purposeOutcome: Joi.string().allow('').required(),
  purposeFinal: Joi.string().allow('').required(),
  feedbackRate: Joi.number(),
  teamFeedback: Joi.string().allow(''),
});
const promiseStatements = Joi.object().keys({
  promiseVerb: Joi.string().allow('').required(),
  promiseComponent: Joi.string().allow('').required(),
  finalPromise: Joi.string().allow('').required(),
  completed,
});

exports.updateField = () => Joi.object().keys({
  step: Joi.string().valid(...Object.values(impactConstants.steps)).required(),
  field: Joi.alternatives()
    .conditional('step', [
      {
        is: impactConstants.steps.lifePurpose,
        then: Joi.string().valid(...Object.values(impactConstants.lifePurpose)),
      },
      {
        is: impactConstants.steps.promiseStatements,
        then: Joi.string().valid(...Object.values(impactConstants.promiseStatements)),
      },
      {
        is: impactConstants.steps.completed,
        then: Joi.string().valid(impactConstants.completed),
      },
    ]).required(),
  value: Joi.alternatives()
    .conditional('field', [
      {
        is: impactConstants.fields.feedbackRate,
        then: Joi.number().required(),
      },
      {
        is: impactConstants.fields.completed,
        then: Joi.boolean().required(),
        otherwise: Joi.string().required(),
      },
    ]),
});

exports.create = () => Joi.object().keys({
  lifePurpose: lifePurpose.required(),
  promiseStatements: promiseStatements.required(),
  completed: completed.required(),
});
