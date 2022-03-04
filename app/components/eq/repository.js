const EqScore = require("../../models/EmotionalIntl");
exports.create = async (doc) => {
   const score = new EqScore(doc);
   await score.save()
};

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
   conditions = {}, projection = {}, options = {},
) => EqScore.findOne(conditions, projection, options);

/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateOne = (
   conditions = {}, doc = {}, options = {},
) => EqScore.updateOne(conditions, doc, options);

