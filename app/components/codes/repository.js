const RegistrationCode = require('../../models/RegistrationCode');

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => RegistrationCode.find(conditions, projection, options);

/**
 * @param conditions
 * @return {Promise<*>}
 */
exports.count = (conditions = {}) => RegistrationCode.countDocuments(conditions);

exports.create = (doc = {}) => (new RegistrationCode(doc)).save();

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
  conditions = {}, projection = {}, options = {},
) => RegistrationCode.findOne(conditions, projection, options);

/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateOne = (
  conditions = {}, doc = {}, options = {},
) => RegistrationCode.updateOne(conditions, doc, options);
