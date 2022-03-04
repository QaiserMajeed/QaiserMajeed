const { ObjectID } = require('mongoose').mongo;
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
 * @param conditions
 * @param select
 * @param skip
 * @param limit
 * @return {Promise<*>}
 */
exports.findWithPagination = (
  conditions = {}, skip = 0, limit = 10, select = {},
) => RegistrationCode.find(conditions)
  .sort({ _id: -1 })
  .skip(skip)
  .limit(limit <= 100 ? limit : 100)
  .select(select)
  .lean();

/**
 * @param { string } id
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findById = (
  id, conditions = {}, projection = {}, options = {},
) => RegistrationCode.findOne({
  _id: ObjectID(id),
  ...conditions,
}, projection, options).lean();

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

/**
 *
 * @param { string } id
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateById = (
  id, conditions = {}, doc = {}, options = {},
) => RegistrationCode.updateOne({
  _id: ObjectID(id),
  ...conditions,
}, doc, options);

/**
 *
 * @param { string} id
 * @param { string } userId
 * @returns {Promise<*>}
 */
exports.deleteByID = (id, userId) => RegistrationCode
  .deleteOne({
    _id: ObjectID(id),
    userId: ObjectID(userId),
  });
