const AccessToken = require('../../models/AccessToken');


exports.create = (doc) => (new AccessToken(doc)).save();


/**
 * @param conditions
 * @param projection
 * @param options
 * @return {Promise<*>}
 */
 exports.findOne = (
    conditions = {}, projection = {}, options = {},
  ) => AccessToken.findOne(conditions, projection, options);
  
/**
 *
 * @param conditions
 * @param doc
 * @param options
 * @return {Promise<*>}
 */
 exports.updateOne = (
    conditions = {}, doc = {}, options = {},
  ) => AccessToken.updateOne(conditions, doc, options);
  
