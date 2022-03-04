const align = require('../../components/trialstriumphs/swagger');
const auth = require('../../components/auth/swagger');
const profile = require('../../components/profile/swagger');
const score = require('../../components/score/swagger');
const impact = require('../../components/impact/swagger');
const grow = require('../../components/grow/swagger');
const contactUs = require('../../components/contactUs/swagger');
const registrationCode = require('../../components/registration-code/swagger');
const partner = require('../../components/partner/swagger');

module.exports = {
  ...profile.admin,
  ...partner,
  ...registrationCode,
  ...align,
  ...auth,
  ...impact,
  ...grow,
  ...profile.user,
  ...score,
  ...contactUs,
};
