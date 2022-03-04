const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')('sk_test_JNEnJSwsOQLYrOU6rJK1DaSm00UeHb0soA');
const userRepository = require('../../repositories/user.repository');
const { paymentStatus } = require('../../constants/user');
const logger = require('../../utils/logger/logger');
const { paymentIntent, subscriptionSchedule, customer } = require('../../constants/stripe');

/**
 *
 * @param  { string } email
 * @returns {Promise<Stripe.Customer>}
 */
exports.createCustomer = async (email) => {
  if (await userRepository.count({ email })) throw new Error('invalid_credentials');

  return stripe.customers.create({ email });
};
/**
 *
 * @param id
 * @returns {Promise<Stripe.Customer | Stripe.DeletedCustomer>}
 */
exports.retrieveCustomer = async (id) => stripe.customers.retrieve(id);

/**
 *
 * @param { string } customerId
 * @returns {ApiListPromise<Stripe.Subscription>}
 */
exports.getSubscriptions = (customerId) => stripe.subscriptions
  .list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

/**
 *
 * @param customerId
 * @param priceId
 * @returns {Promise<{clientSecret: *, subscriptionId: string} | Error>}
 */
exports.createSubscription = (customerId, priceId) => stripe.subscriptions.create({
  customer: customerId,
  items: [{
    price: priceId,
  }],
  payment_behavior: 'default_incomplete',
  collection_method: 'charge_automatically',
  cancel_at_period_end: true,
  expand: ['latest_invoice.payment_intent'],
})
  .then((subscription) => ({
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  }));

/**
 *
 * @param event
 * @param sig
 * @return { boolean }
 */
exports.getWebhookEvent = async (event, sig) => {
  const customerId = event.data.object.customer;

  if (!customerId) return false;

  switch (event.type) {
    case paymentIntent.SUCCEEDED:
      await userRepository.updatePaymentStatus(customerId, paymentStatus.PAYED);
      logger.info(`${customerId} ${event.type}`);
      break;
    case paymentIntent.PROCESSING:
      await userRepository.updatePaymentStatus(customerId, paymentStatus.PENDING);
      logger.info(`${customerId} ${event.type}`);
      break;
    case subscriptionSchedule.CANCELED:
      logger.info(`${customerId} ${event.type}`);
      await userRepository.updatePaymentStatus(customerId, paymentStatus.NOT_PAYED);
      break;
    case customer.SUBSCRIPTION_DELETED:
      logger.info(`${customerId} ${event.type}`);
      await userRepository.updatePaymentStatus(customerId, paymentStatus.NOT_PAYED);
      break;
    case paymentIntent.CANCELED:
      logger.info(`${customerId} ${event.type}`);
      await userRepository.updatePaymentStatus(customerId, paymentStatus.NOT_PAYED);
      break;
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }
  return true;
};

/**
 *
 * @returns {Promise<Stripe.Terminal.ConnectionToken>}
 */
exports.createConnection = () => stripe.terminal.connectionTokens.create();

/**
 *
 * @param { object } plan
 * @returns {Promise<{amount, name: string, currency, interval, id}>}
 */
const getProduct = async (plan) => {
  const { active, metadata } = await stripe.products.retrieve(plan.product);
  return {
    id: plan.id,
    amount: plan.amount,
    currency: plan.currency,
    interval: plan.interval,
    name: metadata.hasOwnProperty('type') ? metadata.type : null,
    active,
  };
};

/**
 *
 * @returns {ApiListPromise<Stripe.Plan>}
 */
exports.getPrices = async () => {
  const plans = await stripe.plans.list();
  return Promise.all(plans.data.map(getProduct))
    .then((result) => result
      .filter((item) => item.active === true && item.name !== null));
};
