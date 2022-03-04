const { ObjectID } = require('mongoose').mongo;
const TrialsTriumphs = require('../../models/TrialsTriumphs');
const { selectAllExcept } = require('../../constants/mongodb');

/**
 *
 * @param {
 * { userId: string,
 * trials: string[],
 * triumphs: string[],
 * completed: boolean,
 * importantTrials: string[],
 * importantTriumphs: string[] }
 * } data
 * @return {Promise<any>}
 */
exports.create = async (data) => TrialsTriumphs.replaceOne({
  userId: ObjectID(data.userId),
}, data, { upsert: true });

/**
 *
 * @param { string } userId
 * @param { object } select
 * @return {Promise<any>}
 */
exports.find = async (userId, select = selectAllExcept) => TrialsTriumphs
  .findOne({ userId: ObjectID(userId) })
  .select(select)
  .lean();

/**
 *
 * @param { string } userId
 * @param { string } field
 * @param { string[] } value
 * @return {Promise<any>}
 */
exports.update = async (userId, field, value) => TrialsTriumphs
  .updateOne({
    userId: ObjectID(userId),
  }, {
    $set: {
      [field]: value,
    },
  }, { upsert: true });
