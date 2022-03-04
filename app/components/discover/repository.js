const Discover = require('../../models/Discover');

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
exports.findById = (id) => Discover.findOne({ _id: id });

/**
 *
 * @param conditions
 * @param projection
 * @param options
 * @return { Promise<*> }
 */
exports.find = (conditions = {}, projection = {}, options = {}) => Discover
  .find(conditions, projection, options);

/**
 *
 * @param ids
 * @param conditions
 * @param projection
 * @param options
 * @return { Promise<*> }
 */
exports.findByIds = (ids, conditions = {}, projection = {}, options = {}) => Discover
  .find({
    _id: {
      $in: ids,
    },
    ...conditions,
  }, projection, options);
