const { ObjectID } = require('mongoose').mongo;
const { userTypes } = require('../../constants/user');
const userRepository = require('../../repositories/user.repository');
const { paymentStatus } = require('../../constants/user');
const { pagination } = require('../../utils/responses/pagination');
const { getHash } = require('../../utils/bcrypt/bcrypt');
const stripeService = require('../stripe/service');

const selectPartner = {
  first_name: 1,
  last_name: 1,
  email: 1,
  partner: 1,
  createdAt: 1,
  payment_status: 1,
};

exports.getCustomer = async (partner) => {
  if (partner.hasOwnProperty('customerId') && partner.customerId !== undefined) {
    return stripeService.retrieveCustomer(partner.customerId);
  }
  return false;
};
/**
 *
 * @param {{firstName, lastName, email, advCode, initialLicenses, password, customerId}} partner
 * @return { Promise<*>}
 */
exports.create = async (partner) => {
  //Initial Licenses
  const limit = 10;
  const password = await getHash(partner.password);

  const user = await userRepository.create({
    first_name: partner.firstName,
    last_name: partner.lastName,
    email: partner.email,
    password,
    partner: {
      advCode: partner.advCode,
      initialRegistrationsLimit: limit,
      currentRegistrationsLimit: limit,
      customerId: partner.customerId,
    },
    payment_status: paymentStatus.NOT_PAYED,
    user_type: userTypes.PARTNER,
  });

  return {
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_type: user.user_type,
      createdAt: user.createdAt,
      tokens: user.tokens,
    },
    token: user.authToken(),
  };
};
/**
 *
 * @param {string} id
 * @return {Promise<*>}
 */
exports.findById = async (id) => {
  const user = await userRepository.findById(id, {
    first_name: 1,
    last_name: 1,
    email: 1,
    _id: 1,
    createdAt: 1,
    partner: 1,
    user_type: userTypes.PARTNER,
  });

  if (!user) throw new Error('Partner not found');
  const customer = await this.getCustomer(user.partner);

  return {
    firstName: user.first_name,
    lastName: user.last_name,
    createdAt: user.createdAt,
    _id: user._id,
    advCode: user.partner.advCode,
    initialRegistrationsLimit: user.partner.initialRegistrationsLimit,
    currentRegistrationsLimit: user.partner.currentRegistrationsLimit,
    ...(customer && { customer }),
  };
};

/**
 *
 * @param {object} conditions
 * @return { Promise <number>}
 */
exports.count = (conditions) => userRepository.count(conditions);

/**
 *
 * @param {string} filter
 * @param {limit} filter
 * @return {Promise<*>}
 */
exports.updateOne = async (id, limit) => userRepository.updateOne(
  { _id: ObjectID(id) },
  {
    $set: {
      'partner.initialRegistrationsLimit': limit,
      'partner.currentRegistrationsLimit': limit,

    },
  },
);

/**
 *
 * @param { string } advCode
 * @param { object } update
 * @return { Promise<*> }
 */
exports.updateByCode = async (advCode, update) => userRepository
  .updateOne({ user_type: userTypes.PARTNER, 'partner.advCode': advCode }, update);

/**
 *
 * @param { number } skip
 * @param { number } limit
 * @param { string } search
 * @return { Promise<*>}
 */
exports.search = async (skip, limit, search) => {
  const filters = {
    user_type: userTypes.PARTNER,
    $or: [
      { first_name: { $regex: new RegExp(`${search}`), $options: 'i' } },
      { last_name: { $regex: new RegExp(`${search}`), $options: 'i' } },
      { email: { $regex: new RegExp(`${search}`), $options: 'i' } },
      { 'partner.advCode': { $regex: new RegExp(`${search}`), $options: 'i' } },
    ],
  };
  const count = await userRepository.count(filters);
  const partners = await userRepository.findWithPagination(
    filters,
    selectPartner,
    skip,
    limit,
  );

  partners.forEach((user) => {
    user.advCode = user.partner.advCode;
    user.initialRegistrationsLimit = user.partner.initialRegistrationsLimit;
    user.currentRegistrationsLimit = user.partner.currentRegistrationsLimit;
    delete user.partner;
  });

  return pagination(partners, count, skip, limit);
};

exports.isPartnerUsers = async (partner, userId) => {
  if (partner.user_type !== userTypes.PARTNER) throw new Error('You are not partner');

  if (partner.partner.hasOwnProperty('users') && partner.partner.users.length) {
    const isPartnerUser = partner.partner.users.find((user) => String(user) === String(userId));
    if (!isPartnerUser) throw new Error('It`s not partner user');
    return true;
  }

  throw new Error('Partner does not have any users');
};
