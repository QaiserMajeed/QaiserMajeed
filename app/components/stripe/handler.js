const validator = require('./validator');
const stripeService = require('./service');
const responses = require('../../utils/responses/responses');
const logger = require('../../utils/logger/logger');

exports.getConnectionToken = (req, res) => {
  stripeService
    .createConnection()
    .then((result) => res.json(responses.successful({ secret: result.secret })))
    .catch((e) => res.json(responses.error(e.message)));
};

exports.createCustomer = async (req, res) => {
  try {
    const { email } = await validator.createCustomer().validateAsync(req.body);

    stripeService
      .createCustomer(email)
      .then((customer) => {
        res.cookie('customer', customer.id, {
          maxAge: 900000,
          httpOnly: true,
        });
        res.json(responses.successful({ customer }));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    return res.json(responses.error(e.message));
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { customerId, priceId } = await validator.createSubscription().validateAsync(req.body);

    stripeService
      .createSubscription(customerId, priceId)
      .then((result) => {
        res.json(responses.successful(result));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    return res.json(responses.error(e.message));
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const { customerId } = await validator.getSubscriptions().validateAsync(req.params);

    stripeService
      .getSubscriptions(customerId)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.webhook = async (req, res) => {
  try {
    await stripeService.getWebhookEvent(req.body, req.headers['stripe-signature']);
    res.json({ received: true });
  } catch (e) {
    logger.error(`webhook error ${e.message || e}`);
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { id } = await validator.getCustomer().validateAsync(req.params);

    stripeService
      .retrieveCustomer(id)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getConfig = async (req, res) => {
  try {
    const prices = await stripeService.getPrices();

    res.json(responses.successful({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      prices,
    }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
