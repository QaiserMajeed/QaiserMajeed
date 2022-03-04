const sgMail = require('@sendgrid/mail');
const { apiKey } = require('./constants/sgMail');
const logger = require('./utils/logger/logger');

exports.sendOtpMail = async (otp, user) => {
  sgMail.setApiKey(apiKey);
  const msg = {
    to: user.email,
    from: 'support@trygobeyond.com',
    name: 'GoBeyond Support',
    subject: 'GoBeyond: Verify Account',
    text:
      `Hi ${
        user.first_name
      }, \n\n`
      + `Please verify your email address. Code: ${
        otp
      }.\n\n`
      + 'Thanks! \n\n'
      + 'GoBeyond Team \n\n',
  };
  sgMail
    .send(msg)
    .then((sgres, err) => {
      if (err) {
        logger.error('Sendgrid error: ', err);
      } else {
        logger.info('Verification code sent');
        logger.info(sgres);
      }
    })
    .catch((error) => {
      logger.error('Error: ', error);
    });
};
/**
 *
 * @param { string } firstName
 * @param { string } lastName
 * @param { string } email
 * @return { void }
 */
exports.sendContactUsEmail = (firstName, lastName = '', email) => {
  sgMail.setApiKey(apiKey);
  sgMail
    .send({
      to: ['greg@joinpurpose.com', 'james@joinpurpose.com'],
      from: 'support@trygobeyond.com',
      name: 'GoBeyond Support',
      subject: 'Contact Us',
      text: `Please contact ${firstName} ${lastName}, ${email}`,
    })
    .then((sgres, err) => {
      if (err) {
        logger.error('Sendgrid error: ', err);
      } else {
        logger.info('Verification code sent');
        logger.info(JSON.stringify(sgres));
      }
    })
    .catch((error) => {
      logger.error('Error: ', error);
    });
};
