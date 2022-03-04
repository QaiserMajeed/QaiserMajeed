const growRepository = require('./repository');

/**
 *
 * @param value
 * @returns {{conflict1, conflict2, comfort1, comfort2}}
 */
exports.getSituations = (value) => ({
  conflict1: value,
  conflict2: value,
  comfort1: value,
  comfort2: value,
});

/**
 *
 * @param {
 * {
 *  conflict1: [{key, value}],
 *  conflict2: [{key, value}],
 *  comfort1: [{key, value}],
 *  comfort2:[{key, value}]
 *  }
 * } situations
 * @param { boolean } completed
 */
exports.calcGrow = (situations, completed) => {
  if (!completed) return null;
  situations = [
    ...situations.comfort1,
    ...situations.comfort2,
    ...situations.conflict1,
    ...situations.conflict2,
  ];

  const sortValue = (a, b) => b.score - a.score;
  const comfort = {
    visionary: situations[0].value + situations[6].value,
    catalyst: situations[1].value + situations[7].value,
    analyst: situations[2].value + situations[9].value,
    companion: situations[4].value + situations[5].value,
  };
  const conflict = {
    visionary: situations[10].value + situations[18].value,
    catalyst: situations[11].value + situations[16].value,
    analyst: situations[12].value + situations[19].value,
    companion: situations[14].value + situations[17].value,
  };
  return {
    completed,
    situations: {
      result: [
        { category: 'visionary', score: comfort.visionary + conflict.visionary },
        { category: 'catalyst', score: comfort.catalyst + comfort.catalyst },
        { category: 'analyst', score: comfort.analyst + conflict.analyst },
        { category: 'companion', score: comfort.companion + conflict.companion },
      ].sort(sortValue),
    },
  };
};

/**
 *
 * @param {string} userId
 * @returns {Promise<*>}
 */
exports.getFullResult = async (userId) => growRepository
  .find(userId)
  .then((result) => (
    !result || !result.hasOwnProperty('completed') ? null : this.calcGrow(result.situations, result.completed)));
