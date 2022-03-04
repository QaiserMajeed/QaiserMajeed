const purposeRepository = require("./repository");
const purposePulseRepository = require("./pulseRepository");
const purposeScoreRepository = require("../../repositories/purpose-score.repository");
const eqRepository = require("../eq/repository");
const responses = require("../../utils/responses/responses");
const mongodbResponses = require("../../utils/responses/mongodb");
const validator = require("./validator");
const purposeService = require("./service");
const scoreConstants = require("../../constants/score");
const linkConstants = require("../../constants/externalLinks");
const User = require("../../models/User");
const AccessToken = require("../../models/AccessToken");
const exerciseName = require("../../constants/excerises");
const url = require("url");
const pmark = require("../../utils/postmark");

exports.getPurpose = async (req, res) => {
  if (!req.user) {
    return res.json(responses.successful());
  }
  purposeRepository
    .find(req.user._id)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));
};

exports.getPulse = async (req, res) => {
  if (!req.user) {
    return res.json(responses.successful());
  }
  const queryObject = url.parse(req.url, true).query;
  console.log(queryObject.token);
  purposePulseRepository
    .find(req.user._id, url.parse(req.url, true).query.token)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));
};

exports.getScore = async (req, res) => {
  purposeRepository
    .find(req.user._id, {
      score: 1,
      _id: 0,
    })
    .then((purpose) => {
      res.json(
        responses.successful({
          score: purpose?.score
            ? {
                ...purpose.score,
              }
            : null,
          result: purposeService.calcResults(purpose?.score),
        })
      );
    })
    .catch((e) => res.json(responses.error(e.message)));
};
exports.getDNA = async (req, res) =>
  purposeRepository
    .find(req.user._id, { DNA: 1, _id: 0 })
    .then((result) =>
      res.json(
        responses.successful({
          DNA: result?.DNA
            ? {
                ...result.DNA,
              }
            : null,
        })
      )
    )
    .catch((e) => res.json(responses.error(e.message)));

exports.getEmotionalIntl = async (req, res) => {
  if (!req.user) {
    return res.json(responses.successful());
  }
  purposeRepository
    .find(req.user._id, { emotionalIntl: 1, _id: 0 })
    .then((result) =>
      res.json(
        responses.successful({
          emotionalIntl: result?.emotionalIntl
            ? {
                ...result.emotionalIntl,
              }
            : null,
        })
      )
    )
    .catch((e) => res.json(responses.error(e.message)));
};
exports.getResult = async (req, res) => {
  if (!req.user) {
    return res.json(responses.successful());
  }
  purposeRepository
    .find(req.user._id)
    .then((result) => {
      if (!result) {
        return res.json(responses.successful(null));
      }
      console.log(result);
      return res.json(responses.successful(purposeService.getResults(result)));
    })
    .catch((e) => res.json(responses.error(e.message)));
};

exports.updateField = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const doc = await validator.updateField().validateAsync(req.body);
    const field =
      doc.step === scoreConstants.completed
        ? doc.field
        : `${doc.step}.${doc.field}`;
    return purposeRepository
      .updateField(userId, field, doc.value)
      .then((result) => {
        purposeService.updateCompleteField(userId, field, doc.value);
        if (doc.step == "DNA" && doc.field == "completed" && doc.value) {
          purposeRepository
            .find(userId)
            .then((dna) => {
              const verbs = dna.DNA.impacts
                .sort((a, b) => (a.rank < b.rank ? -1 : 1))
                .slice(0, 3)
                .map((impact) => impact);
              console.log(verbs);
              pmark.sendWithTemplate(
                {
                  purpose_types: [
                    {
                      type: purposeService.capitalizeFirstLetter(
                        dna.DNA.identities[0]
                      ),
                    },
                    {
                      type: purposeService.capitalizeFirstLetter(
                        dna.DNA.identities[1]
                      ),
                    },
                    {
                      type: purposeService.capitalizeFirstLetter(
                        dna.DNA.identities[2]
                      ),
                    },
                  ],
                  impact_word: [
                    {
                      impact: purposeService.capitalizeFirstLetter(
                        verbs[0].verb
                      ),
                    },
                    {
                      impact: purposeService.capitalizeFirstLetter(
                        verbs[1].verb
                      ),
                    },
                    {
                      impact: purposeService.capitalizeFirstLetter(
                        verbs[2].verb
                      ),
                    },
                  ],
                },
                26784292,
                req.user.email
              );
            })
            .catch((e) => {
              console.log(e.message);
            });
        }
        return res.json(mongodbResponses.validResponse(result));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.create = async (req, res) => {
  try {
    const userId = req.user._id;
    const doc = await validator.create().validateAsync(req.body);

    purposeRepository
      .create({
        userId,
        ...doc,
      })
      .then(() => {
        return res.json(responses.successful(purposeService.getResults(doc)));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

// for not authorized users
exports.calcScore = async (req, res) => {
  try {
    const data = await validator.scoreUI().validateAsync(req.body);
    const result = purposeService.calcResults(data);
    purposeScoreRepository.create({
      ...data,
      result,
    });
    pmark.sendWithTemplate(
      {
        scoreColor:
          result <= 2.5
            ? "#D34837"
            : result < 4
            ? "#E3AD42"
            : result < 5
            ? "#2C8CE6"
            : "#4E9F68",
        purposeScore: result.toFixed(1),
        scoreText:
          result <= 2.5
            ? "A score equal to or below 2.5 is low and considered an Unhealthy Purpose Score. This score would indicate you are not living a purpose centered life."
            : result < 4
            ? "A score between 2.6 and 3.9 is below average and suggests you are Struggling with a purpose centered life."
            : result < 5
            ? "A score between 4.0 and 4.9 suggests you are Coping with a purpose centered life."
            : "A score above 5.0 suggests you have a Healthy purpose centered life.",
      },

      26576997,
      req.body.email
    );
    res.json(responses.successful({ score: result }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

// for not authorized users
exports.calcEqScore = async (req, res) => {
  try {
    const data = await validator.eqUI().validateAsync(req.body);
    const result = purposeService.calcResults(data);
    data.result = result;
    await eqRepository.create(data);
    pmark.sendWithTemplate(
      {
        scoreColor:
          result <= 2.5
            ? "#D34837"
            : result < 4
            ? "#E3AD42"
            : result < 5
            ? "#2C8CE6"
            : "#4E9F68",
        eqScore: result.toFixed(1),
        scoreText:
          result <= 2.5
            ? "You've got some work to do. A score below 2.5 places you below average. But don't worry: Research suggests that people can improve their Emotional Intelligence Score."
            : result < 4
            ? "You've got some work to do. A score between 2.6 and 3.9 places you below average. But don't worry: Research suggests that people can improve their Emotional Intelligence Score."
            : result < 5
            ? "You scored between 4.0 and 4.9 which is above average but you still have room for growth; research suggests that people can improve their Emotional Intelligence Score."
            : "You scored above 5.0 which suggest you have a high Emotional Intelligence, a vital skill. You scored well above average, congratulations!",
      },
      26577949,
      req.body.email
    );
    res.json(responses.successful({ score: result }));
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
        return res.json(responses.error("Email does not exists in our system"));
      }
      const accessToken = await AccessToken.findOne({ user_id: user._id });
      //FINDING THE EXCERISE IF USER HAVE ACCESS TO THE SPECIFIC EXCERiSE
      let exercise = accessToken.exercises.find(
        (o) => o.exercise_name === exerciseLink
      );

      if (!exercise) {
        return res.json(
          responses.error(
            `You don't have the access to ${exerciseName.exerciseName[exerciseLink]} on this account`
          )
        );
      }
      await sendEmail(user, exercise.token);
    });

    function sendEmail(user, accessToken) {
      pmark.sendWithTemplate(
        {
          exerciseName: exerciseName.exerciseName[exerciseLink],
          instructionText: exerciseName.instructionText[exerciseLink],
          exerciseLink: `${getAuthGatedExerciseLink(
            exerciseLink
          )}?token=${accessToken}`,
        },
        26588154,
        user.email
      );
      res.json(responses.successful([]));
    }
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
