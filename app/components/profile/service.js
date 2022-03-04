const { ObjectID } = require('mongoose').mongo;
const userRepository = require('../../repositories/user.repository');
const { pagination } = require('../../utils/responses/pagination');
const { userTypes, userStringType, getUserObject } = require('../../constants/user');

const isAdmin = async (userId) => userRepository.count({
  _id: ObjectID(userId),
  user_type: userTypes.SUPERADMIN,
});

exports.isAdminUser = async (userId) => {
  if (!await isAdmin(userId)) {
    throw new Error('You are not admin');
  }
  return true;
};

/**
 *
 * @param { object } user
 * @param { boolean } isPartner
 * @return {*}
 */
exports.getProfile = (user, isPartner = false) => ({
  user: {
    _id: user._id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    user_type: userStringType[user.user_type],
    payment_status: user.payment_status,
    createdAt: user.createdAt,
    ...(isPartner && {
      advCode: user.partner.advCode,
      initialRegistrationsLimit: user.partner.initialRegistrationsLimit,
      currentRegistrationsLimit: user.partner.currentRegistrationsLimit,
    }),
    tokens: user.tokens,
  },
  token: user.authToken(),
});

const addUserResult = async (user) => {
  user.user_type = userStringType[user.user_type];
  return user;
};

/**
 *
 * @param {{ skip, limit, search }} options
 * @param {*} filters
 * @return { Promise <*> }
 */
exports.search = async (options, filters = {}) => {
  const { skip = 0, limit = 10, search = '' } = options;

  const conditions = {
    ...filters,
    ...(search && {
      $or: [
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    }),
  };

  const [
    users,
    count,
  ] = await Promise.all([
    userRepository.findWithPagination(conditions, getUserObject, skip, limit),
    userRepository.count(conditions),
  ]);

  const fullUsers = await Promise.all(users.map((addUserResult)));

  return pagination(
    fullUsers,
    count,
    skip,
    limit,
  );
};

/**
 *
 * @param { string } id;
 * @return { Promise<*> }
 */
exports.getProfileById = async (id) => {
  const user = await userRepository.findById(id, getUserObject);

  if (!user) throw new Error('User not found');

  const userData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    createdAt: user.createdAt,
    _id: user._id,
    user_type: userStringType[user.user_type],
  };
  return userData;
};
