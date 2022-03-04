const DiscoverIdentity = require('../../models/DiscoverIdentity');

/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
exports.find = (
  conditions = {}, projection = {}, options = {},
) => DiscoverIdentity.find(conditions, projection, options);

/**
 *
 * @param { string } id
 * @param conditions
 * @param projection
 * @param options
 * @return { Promise<*> }
 */
exports.findById = (id, conditions = {}, projection = {}, options = {}) => DiscoverIdentity
  .find({
    _id: id,
    ...conditions,
  }, projection, options);

/**
 *
 * @param conditions
 * @returns {Promise<*>}
 */
exports.count = (conditions = {}) => DiscoverIdentity.countDocuments(conditions);

/**
 *
 * @param { string[] }ids
 * @param conditions
 * @param projection
 * @param options
 * @return { Promise<*> }
 */
exports.findByIds = (ids, conditions = {}, projection = {}, options = {}) => DiscoverIdentity
  .find({
    _id: {
      $in: ids,
    },
    ...conditions,
  }, projection, options).lean();
