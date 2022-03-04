const { ObjectID } = require("mongoose").mongo;
const PurposePulse = require("../../models/PurposePulse");
const { selectAllExcept } = require("../../constants/mongodb");

/**
 *
 * @param { string } userId
 * @param { string } token
 * @param { object } select
 * @return { Promise<object> }
 */
exports.find = (userId, token, select = selectAllExcept) =>
  PurposePulse.findOne({ userId: ObjectID(userId), token: token })
    .select(select)
    .lean();

/**
 *
 * @param { string } userId
 * @param { string } token
 * @param { string } field
 * @param { any } value
 * @return { Promise<object> }
 */
exports.updateField = (userId, token, field, value) =>
  PurposePulse.updateOne(
    {
      userId: ObjectID(userId),
      token: token,
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
  PurposePulse.replaceOne(
    {
      userId: ObjectID(data.userId),
    },
    data,
    { upsert: true, new: true }
  );
