const bodyParser = require('body-parser');
const router = require('express').Router();
const handler = require('./handler');

router.post('/create-customer', handler.createCustomer);
router.post('/create-subscription', handler.createSubscription);
router.get('/subscriptions/:customerId', handler.getSubscriptions);

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handler.webhook);
// router.get('/customer/:id', handler.getCustomer);
router.post('/connection_token', handler.getConnectionToken);
router.get('/config', handler.getConfig);

module.exports = router;
