const validator = require('./validator');
const responses = require('../../utils/responses/responses');
const profileService = require('./service');
const { userTypes } = require('../../constants/user');


// Get profile
exports.getProfile = async (req, res) => {
  try {
    const { user } = req;
    res.json(responses.successful(profileService.getProfile(user)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = await validator.getProfileById().validateAsync(req.params);

    profileService
      .getProfileById(id)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const {
      skip = 0,
      limit = 10,
      search = '',
    } = await validator.getProfiles().validateAsync(req.query);

    profileService.search({
      skip,
      limit,
      search,
    }, { user_type: { $ne: userTypes.PARTNER }})
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
