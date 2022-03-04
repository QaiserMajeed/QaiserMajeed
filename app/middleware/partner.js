const jwt = require('jsonwebtoken');
const logger = require('../utils/logger/logger');
const userRepository = require('../repositories/user.repository');
const { userTypes } = require('../constants/user');

const isPartner = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      return res.status(401).send('401 Unauthorized');
    }
    const token = req.header('Authorization').split(' ');
    if (token[0] === 'Bearer') {
      const decode = jwt.verify(token[1], process.env.SECRET_KEY || 'secretKey');
      const user = await userRepository.findOne({
        _id: decode._id,
        'tokens.token': token[1],
      });
      if (!user) {
        logger.error('invalid token');
        return res.status(403).json({ error: true, message: 'User not logged in' });
      }
      if (user.user_type === userTypes.USER) {
        return res.status(403).json({});
      }
      req.user = user;
      // eslint-disable-next-line prefer-destructuring
      req.token = token[1];
      return next();
    }
    logger.error('Wrong Bearer');
    res.status(403).json({ error: true, message: 'User not logged in' });
  } catch (e) {
    logger.error(e);
    res.status(403).json({ error: true, message: e.message });
  }
};

module.exports = isPartner;
