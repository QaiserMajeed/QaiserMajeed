const validator = require('./validator');
const responses = require('../../utils/responses/responses');
const { sendContactUsEmail } = require('../../sendmail');

exports.contactUs = async (req, res) => {
  try {
    const { firstName, lastName = '', email } = await validator.contactUs().validateAsync(req.body);

    sendContactUsEmail(firstName, lastName, email);
    res.json(responses.successful([]));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
