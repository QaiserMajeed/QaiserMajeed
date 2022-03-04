const { ObjectID } = require("mongoose").mongo;
const Impact = require("../../models/Impact");
const { selectAllExcept } = require("../../constants/mongodb");

/**
 *
 * @param { string } userId
 * @param { object } select
 * @return { Promise<object> }
 */
exports.find = (userId, select = selectAllExcept) =>
  Impact.findOne({ userId: ObjectID(userId) })
    .select(select)
    .lean();

/**
 *
 * @param { string } userId
 * @param { string } field
 * @param { any } value
 * @return { Promise<object> }
 */
exports.updateField = (userId, field, value) =>
  Impact.updateOne(
    {
      userId: ObjectID(userId),
    },
    {
      $set: {
        [field]: value,
      },
    },
    { upsert: true }
  );

/**
 *
 * @param { object } data
 * @return { Promise<object> }
 */
exports.create = (data) =>
  Impact.replaceOne(
    {
      userId: ObjectID(data.userId),
    },
    data,
    { upsert: true, new: true }
  );
