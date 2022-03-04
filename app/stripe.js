const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')('sk_test_JNEnJSwsOQLYrOU6rJK1DaSm00UeHb0soA');

const logger = require('./utils/logger/logger');

const chargeToken = async (stripeToken, couponPercentage) => {
  logger.info('chargeToken: ', couponPercentage);
  let regAmount = 4500;
  if (couponPercentage > 0) {
    const discount = regAmount * couponPercentage / 100;
    regAmount -= discount;
  }
  return stripe.charges.create({
    amount: regAmount,
    currency: 'usd',
    description: 'One time charge',
    source: stripeToken,
  });
};

module.exports = chargeToken;
