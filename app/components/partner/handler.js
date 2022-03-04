const validator = require('./validator');
const responses = require('../../utils/responses/responses');
const partnerService = require('./service');
const profileService = require('../profile/service');
const userRepository = require('../../repositories/user.repository');
const { userTypes } = require('../../constants/user');

exports.create = async (req, res) => {
  try {
    const partner = await validator.addPartner().validateAsync(req.body);
    const user = await userRepository.count({
      email: partner.email,
      'partner.advCode': partner.advCode
    });

    if (user) return res.json(responses.error('invalid_credentials'));

    partnerService.create(partner)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.search = async (req, res) => {
  try {
    const {
      skip = 0,
      limit = 10,
      search = '',
    } = await validator.search().validateAsync(req.query);

    partnerService
      .search(skip, limit, search)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = await validator.getOne().validateAsync(req.params);

    partnerService
      .findById(id)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.changePartner = async (req, res) => {
  try {
    const {
      id,
      initialRegistrationsLimit,
    } = await validator.changePartner().validateAsync(req.body);

    partnerService
      .updateOne(id, initialRegistrationsLimit)
      .then(() => res.json(responses.successful([])))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = profileService.getProfile(req.user, true);
    const customer = await partnerService.getCustomer(req.user.partner);
    res.json(responses.successful({
      ...profile,
      ...(customer && { customer }),
    }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getPartnerUsers = async (req, res) => {
  try {
    const {
      skip = 0,
      limit = 10,
      search = '',
    } = await validator.search().validateAsync(req.query);

    if (req.user.user_type !== userTypes.PARTNER) res.json(responses.error('You are not partner'));

    const partnerUsers = req.user.partner.hasOwnProperty('users') ? req.user.partner.users : [];

    profileService.search({
      skip,
      limit,
      search,
    }, {
      _id: { $in: partnerUsers },
    })
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getPartnerUserById = async (req, res) => {
  try {
    const { id } = await validator.getOne().validateAsync(req.params);

    await partnerService.isPartnerUsers(req.user, id);

    profileService
      .getProfileById(id)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.emssage)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
