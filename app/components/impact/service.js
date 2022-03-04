const impactConstants = require('../../constants/impact');
const resultConstants = require('../../constants/results');
const impactRepository = require('./repository');
const logger = require('../../utils/logger/logger');

/**
 * @param { string } userId
 * @param { string } field
 * @param { any } value
 * @return { void }
 */
const updateCompleteField = (userId, field, value) => {
  let updatedField = '';
  if (field === impactConstants.completed) updatedField = resultConstants.impact.completed;
  if (field === `${impactConstants.steps.lifePurpose}.${impactConstants.completed}`) {
    updatedField = resultConstants.impact.myLifePurpose;
  }
  if (field === `${impactConstants.steps.promiseStatements}.${impactConstants.completed}`) {
    updatedField = resultConstants.impact.promiseStatements;
  }
};

/**
 *
 * @param {string} userId
 * @returns
 */
const getFullResult = (userId) => impactRepository.find(userId);

module.exports = {
  updateCompleteField,
  getFullResult,
};
