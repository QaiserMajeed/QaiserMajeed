module.exports = {
  paymentIntent: {
    SUCCEEDED: 'payment_intent.succeeded',
    PROCESSING: 'payment_intent.processing',
    CANCELED: 'payment_intent.canceled',
  },
  subscriptionSchedule: {
    ABORTED: 'subscription_schedule.aborted',
    CANCELED: 'subscription_schedule.canceled',
    COMPLETED: 'subscription_schedule.completed',
    CREATED: 'subscription_schedule.created',
    EXPIRING: 'subscription_schedule.expiring',
    RELEASED: 'subscription_schedule.released',
    UPDATED: 'subscription_schedule.updated',
  },
  customer: {
    SUBSCRIPTION_CREATED: 'customer.subscription.created',
    SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  },
};
