const Company = require('../../models/Company');
/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
  conditions = {}, projection = {}, options = {},
) => Company.findOne(conditions, projection, options);

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => Company.find(conditions, projection, options);

/**
 * @param { string[] } ids
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findByIds = (
  ids, conditions = {}, projection = {}, options = {},
) => Company.find({
  _id: {
    $in: ids,
  },
  ...conditions,
}, projection, options).lean();

/**
 * @param { coupon, percentage}doc
 * @return {Promise<*>}
 */
exports.create = (doc) => (new Company(doc)).save();

/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateOne = (
  conditions = {}, doc = {}, options = {},
) => Company.updateOne(conditions, doc, options);

/**
 * @param conditions
 * @return {Promise<*>}
 */
exports.count = (conditions = {}) => Company.countDocuments(conditions);
