const { ObjectID } = require('mongoose').mongo;
const User = require('../models/User');
const { paymentStatus } = require('../constants/user');
const { selectAllExcept } = require('../constants/mongodb');

/**
 *
 * @param doc
 * @return {Promise<Document<any, {}>>}
 */
exports.create = (doc = {}) => (new User(doc)).save();

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.findOne = (
  conditions = {}, projection = {}, options = {},
) => User.findOne(conditions, projection, options);

/**
 *
 * @param customerId
 * @param status
 * @return { Promise<*> | boolean }
 */
exports.updatePaymentStatus = (
  customerId, status = paymentStatus.NOT_PAYED,
) => {
  if (!customerId) {
    return false;
  }
  return User.updateOne({ 'partner.customerId': customerId }, { payment_status: status });
};

/**
 * @param { string } id
 * @param { object } select
 * @return {Promise<*>}
 */
exports.findById = (
  id, select = selectAllExcept,
) => User.findOne({
  _id: ObjectID(id),
}).select(select);

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => User.find(conditions, projection, options);

/**
 * @param conditions
 * @param select
 * @param skip
 * @param limit
 * @return {Promise<*>}
 */
exports.findWithPagination = (
  conditions = {}, select = selectAllExcept, skip = 0, limit = 10,
) => User.find(conditions)
  .sort({ _id: -1 })
  .skip(skip)
  .limit(limit <= 100 ? limit : 100)
  .select(select)
  .lean();
/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
exports.updateOne = (
  conditions = {}, doc = {}, options = {},
) => User.updateOne(conditions, doc, options);

/**
 * @param conditions
 * @return {Promise<*>}
 */
exports.count = (conditions = {}) => User.countDocuments(conditions);
