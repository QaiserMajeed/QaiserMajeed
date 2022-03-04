const logger = require('../utils/logger/logger');

function logResponseBody(req, res, next) {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);

    const body = Buffer.concat(chunks).toString('utf8');
    logger.info(req.path, body);

    oldEnd.apply(res);
  };

  next();
}

module.exports = logResponseBody;
