const { ObjectID } = require('mongoose').mongo;
/**
 *
 * @param { string } id
 */
const toObjectID = (id) => ObjectID(id);
/**
 *
 * @param { string[] } ids
 */
const idsToObjectIds = (ids) => ids.map(toObjectID);

module.exports = {
  idsToObjectIds,
};
