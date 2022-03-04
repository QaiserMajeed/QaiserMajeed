const validator = require("./validator");
const responses = require("../../utils/responses/responses");
const { validResponse } = require("../../utils/responses/mongodb");
const trialstriumphsRepository = require("./repository");
const { getFullResult } = require("./service");
const pmark = require("../../utils/postmark");

exports.getTrialsTriumphs = async (req, res) =>
  trialstriumphsRepository
    .find(req.user._id)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));

exports.getTrialsTriumphsResult = async (req, res) =>
  getFullResult(req.user._id)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));

exports.updateField = async (req, res) => {
  try {
    const userId = req.user._id;
    const { field, value } = await validator.update().validateAsync(req.body);
    return trialstriumphsRepository
      .update(userId, field, value)
      .then((result) => {
        res.json(validResponse(result));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.create = async (req, res) => {
  try {
    let sendTrialsEmail = true;
    const userId = req.user._id;
    const doc = await validator.create().validateAsync(req.body);
    doc.userId = userId;
    if (!doc.completed) sendTrialsEmail = false;
    if (
      doc.completed &&
      doc.importantTrials.length == 3 &&
      doc.importantTriumphs.length == 3
    ) {
      trialstriumphsRepository.find(userId).then((result) => {
        if (
          JSON.stringify(result.importantTrials) ==
            JSON.stringify(doc.importantTrials) &&
          JSON.stringify(result.importantTriumphs) ==
            JSON.stringify(doc.importantTriumphs)
        )
          sendTrialsEmail = false;
      });
    }
    trialstriumphsRepository
      .create(doc)
      .then(() => {
        if (sendTrialsEmail) {
          pmark.sendWithTemplate(
            {
              values: [
                { value: doc.importantTrials[0] },
                { value: doc.importantTrials[1] },
                { value: doc.importantTrials[2] },
                { value: doc.importantTriumphs[0] },
                { value: doc.importantTriumphs[1] },
                { value: doc.importantTriumphs[2] },
              ],
            },
            26743056,
            req.user.email
          );
        }
        res.json(responses.successful([]));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
