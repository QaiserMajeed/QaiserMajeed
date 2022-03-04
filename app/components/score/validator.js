const Joi = require("@hapi/joi");
const scoreConstants = require("../../constants/score");
const AuthGatedExcerises = require("../../constants/excerises");

const purposeScore = Joi.object().keys({
  name: Joi.string(),
  ageRange: Joi.string(),
  email: Joi.string(),
  day: Joi.number().min(1).required(),
  life: Joi.number().min(1).required(),
  lifeIncludes: Joi.number().min(1).required(),
  personalExistence: Joi.number().min(1).required(),
  goals: Joi.number().min(1).required(),
  dreams: Joi.number().min(1).required(),
  legacy: Joi.number().min(1).required(),
  lifeControl: Joi.number().min(1).required(),
  currentMissions: Joi.number().min(1).required(),
  purpose: Joi.number().min(1).required(),
  completed: Joi.boolean(),
  updatedAt: Joi.date(),
  createdAt: Joi.date(),
});

const impacts = Joi.array()
  .items(
    Joi.object().keys({
      rank: Joi.number().required(),
      verb: Joi.string().allow("").required(),
      identity: Joi.string().allow("").required(),
    })
  )
  .min(9)
  .max(9)
  .required();

const identities = Joi.array().items(Joi.string().allow("")).required();

const emotionalIntl = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string(),
  ableToUnderstand: Joi.number().required(),
  adapt: Joi.number().required(),
  easyToAsk: Joi.number().required(),
  feelGrateful: Joi.number().required(),
  financialAsking: Joi.number().required(),
  financialDecisions: Joi.number().required(),
  financialDiffers: Joi.number().required(),
  financialHelp: Joi.number().required(),
  financialProblems: Joi.number().required(),
  financialSatisfied: Joi.number().required(),
  moneyPressure: Joi.number().required(),
  outlook: Joi.number().required(),
  peopleIChoose: Joi.number().required(),
  relateToExperience: Joi.number().required(),
  thinkingDecisions: Joi.number().required(),
});

const purposeDNA = Joi.object().keys({
  identities,
  impacts,
  completed: Joi.boolean(),
});

const purposePulse = Joi.object().keys({
  updatedAt: Joi.date(),
  createdAt: Joi.date(),
  completed: Joi.boolean(),
  EE1P: Joi.number().required(),
  EE2N: Joi.number().required(),
  EE3P: Joi.number().required(),
  EE4N: Joi.number().required(),
  EM1P: Joi.number().required(),
  EM2N: Joi.number().required(),
  EM3P: Joi.number().required(),
  EM4N: Joi.number().required(),
  EP1P: Joi.number().required(),
  EP2N: Joi.number().required(),
  EP3P: Joi.number().required(),
  EP4N: Joi.number().required(),
  ER1P: Joi.number().required(),
  ER2N: Joi.number().required(),
  ER3P: Joi.number().required(),
  ER4N: Joi.number().required(),
  FI1P: Joi.number().required(),
  FI2N: Joi.number().required(),
  FI3P: Joi.number().required(),
  FI4N: Joi.number().required(),
  FO1P: Joi.number().required(),
  FO2N: Joi.number().required(),
  FO3P: Joi.number().required(),
  FO4N: Joi.number().required(),
  FS1P: Joi.number().required(),
  FS2N: Joi.number().required(),
  FS3P: Joi.number().required(),
  FS4N: Joi.number().required(),
  FW1P: Joi.number().required(),
  FW2N: Joi.number().required(),
  FW3P: Joi.number().required(),
  FW4N: Joi.number().required(),
  IJ1P: Joi.number().required(),
  IJ2N: Joi.number().required(),
  IJ3P: Joi.number().required(),
  IJ4N: Joi.number().required(),
  IC1P: Joi.number().required(),
  IC2N: Joi.number().required(),
  IC3P: Joi.number().required(),
  IC4N: Joi.number().required(),
  IA1P: Joi.number().required(),
  IA2N: Joi.number().required(),
  IA3P: Joi.number().required(),
  IA4N: Joi.number().required(),
  IR1P: Joi.number().required(),
  IR2N: Joi.number().required(),
  IR3P: Joi.number().required(),
  IR4N: Joi.number().required(),
  LG1P: Joi.number().required(),
  LG2N: Joi.number().required(),
  LG3P: Joi.number().required(),
  LG4N: Joi.number().required(),
  LP1P: Joi.number().required(),
  LP2N: Joi.number().required(),
  LP3P: Joi.number().required(),
  LP4N: Joi.number().required(),
  LS1P: Joi.number().required(),
  LS2N: Joi.number().required(),
  LS3P: Joi.number().required(),
  LS4N: Joi.number().required(),
  LV1P: Joi.number().required(),
  LV2N: Joi.number().required(),
  LV3P: Joi.number().required(),
  LV4N: Joi.number().required(),
  SF1N: Joi.number().required(),
  SF2P: Joi.number().required(),
  SF3P: Joi.number().required(),
  SF4N: Joi.number().required(),
  SM1P: Joi.number().required(),
  SM2N: Joi.number().required(),
  SM3N: Joi.number().required(),
  SM4P: Joi.number().required(),
  SR1P: Joi.number().required(),
  SR2N: Joi.number().required(),
  SR3N: Joi.number().required(),
  SR4P: Joi.number().required(),
  SW1P: Joi.number().required(),
  SW2N: Joi.number().required(),
  SW3P: Joi.number().required(),
  SW4N: Joi.number().required(),
  WG1P: Joi.number().required(),
  WG2N: Joi.number().required(),
  WG3P: Joi.number().required(),
  WG4N: Joi.number().required(),
  WP1P: Joi.number().required(),
  WP2N: Joi.number().required(),
  WP3P: Joi.number().required(),
  WP4N: Joi.number().required(),
  WS1P: Joi.number().required(),
  WS2N: Joi.number().required(),
  WS3P: Joi.number().required(),
  WS4N: Joi.number().required(),
  WV1P: Joi.number().required(),
  WV2N: Joi.number().required(),
  WV3P: Joi.number().required(),
  WV4N: Joi.number().required(),
});

exports.updateField = () =>
  Joi.object().keys({
    token: Joi.string(),
    step: Joi.string()
      .valid(...Object.values(scoreConstants.steps))
      .required(),
    field: Joi.alternatives()
      .conditional("step", [
        {
          is: scoreConstants.steps.score,
          then: Joi.string().valid(
            ...Object.values(scoreConstants.purposeScore)
          ),
        },
        {
          is: scoreConstants.steps.dna,
          then: Joi.string().valid(...Object.values(scoreConstants.purposeDNA)),
        },
        {
          is: scoreConstants.steps.emotionalIntl,
          then: Joi.number().valid(
            ...Object.values(scoreConstants.emotionalIntl)
          ),
        },
        {
          is: scoreConstants.steps.pulse,
          then: Joi.number().valid(
            ...Object.values(scoreConstants.purposePulse)
          ),
        },
        {
          is: scoreConstants.steps.completed,
          then: Joi.string().valid(scoreConstants.completed),
        },
      ])
      .required(),
    value: Joi.alternatives().conditional("field", [
      {
        is: scoreConstants.fields.name,
        then: Joi.string().required(),
      },
      {
        is: scoreConstants.fields.ageRange,
        then: Joi.string().required(),
      },
      {
        is: scoreConstants.fields.email,
        then: Joi.string().required(),
      },
      {
        is: scoreConstants.fields.identities,
        then: identities,
      },
      {
        is: scoreConstants.fields.impacts,
        then: impacts,
      },
      {
        is: scoreConstants.fields.completed,
        then: Joi.boolean().required(),
        otherwise: Joi.number().required(),
      },
    ]),
  });

exports.create = () =>
  Joi.object().keys({
    score: purposeScore.required(),
    DNA: purposeDNA.required(),
    emotionalIntl: emotionalIntl.required(),
    pulse: purposePulse.required(),
    completed: Joi.boolean().required(),
  });

exports.scoreUI = () => purposeScore;
exports.eqUI = () => emotionalIntl

exports.generateLink = () =>
  Joi.object().keys({
    email: Joi.string().email().required(),
    exerciseLink: Joi.string().valid(
      ...Object.values(AuthGatedExcerises.authGatedExcerises)
    ),
  });
