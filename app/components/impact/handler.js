const validator = require("./validator");
const impactRepository = require("./repository");
const responses = require("../../utils/responses/responses");
const impactConstants = require("../../constants/impact");
const resultConstants = require("../../constants/results");
const { validResponse } = require("../../utils/responses/mongodb");
const { updateCompleteField, getFullResult } = require("./service");
const pmark = require("../../utils/postmark");

exports.getImpact = async (req, res) =>
  getFullResult(req.user._id)
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));

exports.getLifePurpose = async (req, res) =>
  impactRepository
    .find(req.user._id, { _id: 0, lifePurpose: 1 })
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));

exports.getPromiseStatements = async (req, res) =>
  impactRepository
    .find(req.user._id, { _id: 0, promiseStatements: 1 })
    .then((result) => res.json(responses.successful(result)))
    .catch((e) => res.json(responses.error(e.message)));

exports.create = async (req, res) => {
  try {
    let sendPurposeEmail = false;
    let sendPromiseEmail = false;
    const userId = req.user._id;
    const doc = await validator.create().validateAsync(req.body);
    if (doc.completed && doc.lifePurpose.purposeFinal != "") {
      impactRepository.find(userId).then((result) => {
        if (result.lifePurpose.purposeFinal != doc.lifePurpose.purposeFinal)
          sendPurposeEmail = true;
        if (
          result.promiseStatements.finalPromise !=
          doc.promiseStatements.finalPromise
        )
          sendPromiseEmail = true;
      });
    }
    impactRepository
      .create({
        userId,
        ...doc,
      })
      .then(() => {
        if (sendPurposeEmail) {
          pmark.sendWithTemplate(
            { purpose: doc.lifePurpose.purposeFinal },
            26784293,
            req.user.email
          );
        }
        if (sendPromiseEmail) {
          pmark.sendWithTemplate(
            { promise: doc.promiseStatements.finalPromise },
            26784294,
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
exports.updateField = async (req, res) => {
  try {
    const userId = req.user._id;
    const doc = await validator.updateField().validateAsync(req.body);
    const field =
      doc.step === impactConstants.completed
        ? doc.field
        : `${doc.step}.${doc.field}`;

    return impactRepository
      .updateField(userId, field, doc.value)
      .then((result) => {
        updateCompleteField(userId, field, doc.value);
        res.json(validResponse(result));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
