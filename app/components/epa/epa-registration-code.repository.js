const EPARegistrationCode = require('../../models/EPARegistrationCode');

/**
 * @param conditions
 * @return {Promise<*>}
 */
exports.count = (conditions = {}) => EPARegistrationCode.countDocuments(conditions);

/**
 * @param doc
 * @return {Promise<*>}
 */
exports.create = (doc = {}) => (new EPARegistrationCode(doc)).save();

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
  conditions = {}, projection = {}, options = {},
) => EPARegistrationCode.findOne(conditions, projection, options);

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => EPARegistrationCode.find(conditions, projection, options);
