const resultConstants = require("../../constants/results");
const scoreConstants = require("../../constants/score");
const purposeRepository = require("./repository");

/**
 *
 * @param { object } data
 * @return { bool }
 */
const emailPurposePulsePDF = (data) => {
  if (!data) return null;
  let sum = 0;
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "number") {
        sum += data[key];
        count += 1;
      }
    }
  }
  return sum / count;
};

/**
 *
 * @param { object } data
 * @return { number | null }
 */
const calcResults = (data) => {
  if (!data) return null;
  let sum = 0;
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "number") {
        sum += data[key];
        count += 1;
      }
    }
  }
  return sum / count;
};

/**
 *
 * @param { [{ rank: number, title: string, identity: string }] } impacts
 * @param { number } count
 * @return { [{ rank: number, title: string, identity: string }] }
 */
const getTopImpacts = (impacts, count = 3) =>
  impacts.sort((a, b) => a.rank - b.rank).splice(0, count);

/**
 *
 * @param {{
 * impacts: [{ rank: number, title: string, identity: string }],
 * identities: [{title: string, description: string}]}} data
 * @return {{identities: *[], impacts: *}}
 */
const getDNAResults = (data) => ({
  impacts: getTopImpacts(data.hasOwnProperty("impacts") ? data.impacts : []),
  identities: data.hasOwnProperty("identities") ? data.identities : [],
});

/**
 *
 * @param { {
 * score: object,
 * emotionalIntl: object,
 * DNA: { identities: array, impacts: array},
 * completed: boolean }} data
 * @return {{score: number, DNA: {identities: *[], impacts: *}, emotionalIntl: number } | boolean}
 */
const getResults = (data) => ({
  score:
    data.hasOwnProperty("score") &&
    data.score.hasOwnProperty("completed") &&
    data.score.completed
      ? calcResults(data.score)
      : null,
  DNA:
    data.hasOwnProperty("DNA") &&
    data.DNA.hasOwnProperty("completed") &&
    data.DNA.completed
      ? getDNAResults(data.DNA)
      : false,
  emotionalIntl:
    data.hasOwnProperty("emotionalIntl") &&
    data.emotionalIntl.hasOwnProperty("completed") &&
    data.emotionalIntl.completed
      ? calcResults(data.emotionalIntl)
      : null,
  // pulse:
  //   data.hasOwnProperty("pulse") &&
  //   data.pulse.hasOwnProperty("completed") &&
  //   data.pulse.completed
  //     ? calcPulseResults(data.pulse)
  //     : null,
  completed: data.hasOwnProperty("completed") ? data.completed : false,
});

/**
 *
 * @param { string } userId
 * @param { string } field
 * @param { any } value
 * @return { void }
 */
const updateCompleteField = (userId, field, value) => {
  let updatedField = "";

  if (field === scoreConstants.completed)
    updatedField = resultConstants.score.completed;
  if (field === resultConstants.score.completed)
    updatedField = resultConstants.score.purposeScore;
  if (field === `${scoreConstants.steps.dna}.${scoreConstants.completed}`) {
    updatedField = resultConstants.score.purposeDNA;
  }
  if (
    field ===
    `${scoreConstants.steps.emotionalIntl}.${scoreConstants.completed}`
  ) {
    updatedField = resultConstants.score.emotionalIntl;
  }
};

const getFullResult = (userId) =>
  purposeRepository
    .find(userId)
    .then((result) => (result ? getResults(result) : null));

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  calcResults,
  getResults,
  getFullResult,
  updateCompleteField,
  capitalizeFirstLetter,
};
