const Joi = require('@hapi/joi');

exports.createEPAcode = () => Joi.object().keys({
  code: Joi.string().required(),
  initial_count: Joi.number().integer().required(),
  title: Joi.string().required(),
  owner: Joi.string().required(),
  company_id: Joi.string().required(),
});

exports.checkEPAcode = () => Joi.object().keys({
  code: Joi.string().required(),
});

exports.createTeam = () => Joi.object().keys({
  teamName: Joi.string().required(),
  members: Joi.array().required(),
});

exports.getTeamResults = () => Joi.object().keys({
  id: Joi.string().required(),
});

exports.createIndividualReport = () => Joi.object().keys({
  formResponse: Joi.object().keys({
    answers: Joi.object().required(),
    hidden: Joi.object.keys({
      registrationcode: Joi.string().required(),
    }),
  }),
});

exports.getIndividualEpaReport = () => Joi.object().keys({
  epa_id: Joi.string().required(),
});

exports.getEPAResults = () => Joi.object().keys({
  cohort: Joi.string().required(),
});

exports.getTeamReports = () => Joi.object().keys({
  cohort: Joi.string().required(),
});
