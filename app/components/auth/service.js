const partnerService = require('../partner/service');

/**
 *
 * @param { string } email
 * @param { string } password
 * @return {Promise<{partner, token}>}
 */
exports.loginPartner = async (email, password) => {
  const partner = await partnerService.findOne({ email });

  if (!partner) throw new Error('Partner not found');
  const isMatch = await partner.comparePassword(password, partner.password);
  if (!isMatch) throw new Error('You have entered an invalid password.');

  return {
    partner: {
      _id: partner._id,
      firstName: partner.firstName,
      lastName: partner.lastName,
      email: partner.email,
      advCode: partner.advCode,
      initialRegistrationsLimit: partner.initialRegistrationsLimit,
      currentRegistrationsLimit: partner.currentRegistrationsLimit,
      tokens: partner.tokens,
    },
    token: partner.authToken(),
  };
};
