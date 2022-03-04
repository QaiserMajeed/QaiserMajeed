const Joi = require("@hapi/joi");
const AuthGatedExcerises = require("../../constants/excerises");
exports.createAccessTokens = () =>
  Joi.object().keys({
    user_id: Joi.string().required(),
    exercises: Joi.array()
      .items(
        Joi.object().keys({
          exercise_name: Joi.string().valid(
            ...Object.values(AuthGatedExcerises.authGatedExcerises)
          ),
          token: Joi.string().required(),
        })
      )
      .required(),

    status: Joi.number().default(1),
  });

exports.createAccessTokensWithNewUsers = () =>
  Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    company: Joi.string().required(),
    email: Joi.string().email().required(),
    purposePulse: Joi.number().required(),
    frictionEq: Joi.number().required(),
    purposeDna: Joi.number().required(),
    purpose: Joi.number().required(),
    promise: Joi.number().required(),
    trialsTriumphs: Joi.number().required(),
  });
