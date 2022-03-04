/**
 *
 * @param { string } message
 * @returns {{payload: [], error: boolean, message}}
 */
exports.error = (message) => (
  console.log(message),
  {
  error: true,
  message,
  payload: [],
});

/**
 *
 * @param { {} } payload
 * @returns {{payload: {}, error: boolean, message: string}}
 */
exports.successful = (payload = []) => ({
  error: false,
  message: 'successful',
  payload,
});
