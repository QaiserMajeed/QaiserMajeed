const validator = require("./validator");
const accessTokenRepository = require("./repository");
const responses = require("../../utils/responses/responses");
const userRepository = require("../../repositories/user.repository");
const exerciseName = require("../../constants/excerises");
require("crypto").randomBytes(20).toString("hex");
const jwt = require("jsonwebtoken");
var fs = require("fs");
var csv = require("csv-parser");
const _ = require("lodash");
var hat = require("hat");

exports.createAccessTokens = async (req, res) => {
  try {
    const { user_id, exercises } = await validator
      .createAccessTokens()
      .validateAsync(req.body);
    const token = await accessTokenRepository.findOne({ user_id: user_id });
    if (!token) {
      accessTokenRepository
        .create({
          user_id,
          exercises,
        })
        .then(() => res.json(responses.successful([])))
        .catch((e) => res.json(responses.error(e)));
    }
    accessTokenRepository
      .updateOne({ _id: token._id }, { exercises })
      .then(() => res.json(responses.successful([])))
      .catch((e) => res.json(responses.error(e)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.createAccessTokensWithNewUsers = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      purposePulse,
      frictionEq,
      purposeDna,
      purpose,
      promise,
      trialsTriumphs,
    } = await validator
      .createAccessTokensWithNewUsers()
      .validateAsync(req.body);

    createUserAndTokens(
      firstName,
      lastName,
      email,
      company,
      purposePulse,
      frictionEq,
      purposeDna,
      purpose,
      promise,
      trialsTriumphs
    )
      .then(() => res.json(responses.successful([])))
      .catch((e) => res.json(responses.error(e)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.createTokenCSV = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let parser = fs
      .createReadStream(req.file.path)
      .pipe(csv())
      .on("data", async (data) => {
        let validateData = _.mapKeys(data, (v, k) => _.camelCase(k));
        const {
          firstName,
          lastName,
          email,
          company,
          purposePulse,
          frictionEq,
          purposeDna,
          purpose,
          promise,
          trialsTriumphs,
        } = validateData;
        parser.pause();
        await createUserAndTokens(
          firstName,
          lastName,
          email,
          company,
          purposePulse,
          frictionEq,
          purposeDna,
          purpose,
          promise,
          trialsTriumphs,
          res
        );
        parser.resume();
      })
      .on("end", async (data) => {
        return res.json(
          responses.successful(
            "File is parsed and created tokens against every user"
          )
        );
      });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

async function createUserAndTokens(
  firstName,
  lastName,
  email,
  company,
  purposePulse,
  frictionEq,
  purposeDNA,
  purpose,
  promise,
  trialsTriumphs
) {
  const dbUser = await userRepository.findOne({ email: email });
  const token = await accessTokenRepository.findOne({ user_id: dbUser?.id });
  const exercises = generateTokens({
    purposePulse,
    frictionEq,
    purposeDNA,
    purpose,
    promise,
    trialsTriumphs,
  });

  if (!token) {
    const user = await userRepository.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      company: company,
      user_type: 1,
    });

    return accessTokenRepository.create({
      user_id: user._id,
      exercises,
    });
  }
  return accessTokenRepository.updateOne(
    { _id: token.id },
    { exercises: exercises }
  );

  function generateTokens(exercises) {
    let generatedExercises = [];
    for (const key in exercises) {
      if (Object.hasOwnProperty.call(exercises, key)) {
        const element = exercises[key];
        for (let index = 0; index < element; index++) {
          generatedExercises.push({
            exercise_name: exerciseName.authGatedExcerises[key],
            token: hat(),
          });
        }
      }
    }
    return generatedExercises;
  }
}
