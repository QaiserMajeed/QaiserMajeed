const { ObjectID } = require('mongoose').mongo;
const Grow = require('../../models/Grow');
const { selectAllExcept } = require('../../constants/mongodb');

/**
 *
 * @param { string } userId
 * @param { object } select
 * @return { Promise<Object> }
 */
exports.find = (userId, select = selectAllExcept) => Grow
  .findOne({ userId: ObjectID(userId) })
  .select(select)
  .lean();

/**
 *
 * @param { string } userId
 * @param { string } field
 * @param { any } value
 * @return { Promise<object> }
 */
exports.updateField = (userId, field, value) => Grow.updateOne({
  userId: ObjectID(userId),
}, {
  $set: {
    [field]: value,
  },
}, { upsert: true });

/**
 *
 * @param { object } data
 * @return { Promise<object> }
 */
exports.create = (data) => Grow.replaceOne({
  userId: ObjectID(data.userId),
}, data, { upsert: true, new: true });
