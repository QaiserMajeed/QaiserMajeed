const Define = require('../../models/Define');

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
  conditions = {}, projection = {}, options = {},
) => Define.findOne(conditions, projection, options).select({ __v: 0, updatedAt: 0 });

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => Define.find(conditions, projection, options);

/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateOne = (
  conditions = {}, doc = {}, options = {},
) => Define.updateOne(conditions, doc, options);

/**
 * @param conditions
 * @return {Promise<*>}
 */
exports.count = (conditions = {}) => Define.countDocuments(conditions);
