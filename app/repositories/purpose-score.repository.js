const PurposeScore = require('../models/PurposeScore');

/**
 *
 * @param { object } doc
 * @return {void}
 */
exports.create = async (doc) => {
  const score = new PurposeScore(doc);
  await score.save();
};
