const responses = require('./responses');

/**
 *
 * @param {{ n: number, nModified: number, ok: number }} response
 * @param { number } count
 * @return { boolean }
 */
const update = (
  response,
  count = 1,
) => response.hasOwnProperty('nModified') && response.nModified === count;

/**
 *
 * @param response
 * @param count
 * @return {boolean}
 */
const upsert = (
  response,
  count = 1,
) => response.hasOwnProperty('upserted') && response.upserted.length === count;

/**
 *
 * @param response
 * @param count
 * @return {boolean}
 */
const remove = (
  response,
  count = 1,
) => response.hasOwnProperty('deletedCount') && response.deletedCount === count;
/**
 *
 * @param {{ n: number, nModified: number, ok: number }} result
 * @param { number } count
 * @return {{payload: {}, error: boolean, message: string}|{payload: *[], error: boolean, message}}
 */
const validResponse = (result, count = 1) => {
  if (update(result, count)) {
    return responses.successful([]);
  }
  if (upsert(result, count)) {
    return responses.successful([]);
  }
  return responses.error('Not modified');
};

/**
 *
 * @param {{ n: number, deletedCount: number, ok: number }} result
 * @param { number } count
 * @return {{payload: {}, error: boolean, message: string}|{payload: *[], error: boolean, message}}
 */
const validDeleteResponse = (result, count = 1) => {
  if (remove(result, count)) {
    return responses.successful([]);
  }
  return responses.error('Not deleted');
};

module.exports = {
  update,
  upsert,
  remove,
  validResponse,
  validDeleteResponse,
};
