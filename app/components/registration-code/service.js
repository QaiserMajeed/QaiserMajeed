const crypto = require('crypto');
const userRepository = require('../../repositories/user.repository');
const { withList } = require('../../constants/code');

const generateCode = (
  length = 20,
  wishlist = withList.full,
) => {
  const code = Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');
  if (/(?=.*[AZ0-9])/ig.test(code)) return code;
  return generateCode(length);
};

/**
 *
 * @param code
 * @returns {Promise<*>}
 */
const addUserProfileToCode = async (code) => {
  code.user = await userRepository.findById(
    code.userId,
    {
      _id: 1, first_name: 1, last_name: 1, email: 1,
    },
  );
  delete code.userId;
  return code;
};

const generateAdvCode = () => `${generateCode(5, withList.short)}-${generateCode(5, withList.short)}`;

/**
 *
 * @param { string } code
 * @returns {Promise<number>}
 */
const isUniqueCode = (code) => userRepository.count({ 'partner.advCode': code });

module.exports = {
  isUniqueCode,
  generateCode,
  generateAdvCode,
  addUserProfileToCode,
};
