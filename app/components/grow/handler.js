const growRepository = require('./repository');
const validator = require('./validator');
const responses = require('../../utils/responses/responses');
const { validResponse } = require('../../utils/responses/mongodb');
const growConstants = require('../../constants/grow');
const resultConstants = require('../../constants/results');
const growService = require('./service');

exports.getGrow = async (req, res) => growRepository
  .find(req.user._id)
  .then((result) => res.json(responses.successful(result)))
  .catch((e) => res.json(responses.error(e.message)));

exports.updateField = async (req, res) => {
  try {
    const userId = req.user._id;
    const { field, value } = await validator.updateField().validateAsync(req.body);

    return growRepository.updateField(
      userId,
      growConstants.situations.includes(field) ? `situations.${field}` : field,
      value,
    )
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
    const userId = req.user._id;
    const data = await validator.create().validateAsync(req.body);

    return growRepository.create({
      userId,
      ...data,
    })
      .then(() => res.json(responses.successful([])))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.calcGrow = async (req, res) => {
  try {
    growRepository
      .find(req.user._id)
      .then((result) => {
        if (!result.completed) return res.json(responses.successful(null));
        return res.json(
          responses.successful(growService.calcGrow(result.situations, result.completed)),
        );
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
