const purposePulseRepository = require("./repository");
const responses = require("../../utils/responses/responses");
const pmark = require("../../utils/postmark");
const mongodbResponses = require("../../utils/responses/mongodb");
const validator = require("./validator");
const linkConstants = require("../../constants/externalLinks");
const User = require("../../models/User");
const AccessToken = require("../../models/AccessToken");
const exerciseName = require("../../constants/excerises");
const url = require("url");
const pulseService = require("./service");
const tokenRepo = require("../accessTokens/repository");
const userRepo = require("../../repositories/user.repository");

exports.getPulse = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const token = await tokenRepo.findOne({
    "exercises.token": queryObject.token,
  });
  if (token === null) {
    return await res.json(responses.error("Please enter a valid URL "));
  }
  purposePulseRepository
    .find(token.user_id, queryObject.token)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));
};

exports.updateField = async (req, res) => {
  try {
    const doc = await validator.updateField().validateAsync(req.body);
    const token = await tokenRepo
      .findOne({ "exercises.token": doc.token })
      .populate("User");
    const user = await userRepo.findById(token.user_id);
    return purposePulseRepository
      .updateField(token.user_id, doc.token, doc.field, doc.value)
      .then((result) => {
        if (doc.field == "completed" && doc.value) {
          purposePulseRepository
            .find(token.user_id, doc.token, {})
            .then(async (result) => {
              await tokenRepo.updateOne(
                { "exercises.token": doc.token },
                { $set: { "exercises.$.isAvailed": true } }
              );
              pulseService.sendPulseToZapier({
                ...result,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
              });
            });
        }
        return res.json(mongodbResponses.validResponse(result));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.generateLink = async (req, res) => {
  try {
    const { email, exerciseLink } = await validator
      .generateLink()
      .validateAsync(req.body);

    User.findOne({ email: email.toLowerCase() }, async (err, user) => {
      if (!user) {
        return res.json(responses.error("system_not_found_email"));
      }
      const accessToken = await AccessToken.findOne({ user_id: user._id });
      if (!accessToken)
        return res.json(responses.error("exercise_access_error"));
      let exercise = accessToken.exercises.find(
        (o) => o.exercise_name === exerciseLink && !o.isAvailed
      );

      if (!exercise) {
        return res.json(responses.error("exercise_access_error"));
      }
      pmark.sendWithTemplate(
        {
          exerciseName: exerciseName.exerciseName[exerciseLink],
          instructionText: exerciseName.instructionText[exerciseLink],
          exerciseLink: `${getAuthGatedExerciseLink(exerciseLink)}?token=${
            exercise.token
          }`,
        },
        26588154,
        user.email
      );
      res.json(responses.successful());
    });
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

function getAuthGatedExerciseLink(exerciseName) {
  for (const key in linkConstants.excerises) {
    if (key == exerciseName) {
      return linkConstants.excerises[key];
    }
  }
}
