const alignRepository = require('./repository');

/**
 *
 * @param {string} userId
 * @returns {Promise<*>}
 */
exports.getFullResult = async (userId) => alignRepository
  .find(userId, {
    importantTrials: 1, importantTriumphs: 1, _id: 0, completed: 1,
  });
