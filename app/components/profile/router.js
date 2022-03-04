const router = require('express').Router();
const handler = require('./handler');
const auth = require('../../middleware/auth');

router.use(auth);

router.get('/', handler.getProfile);

module.exports = router;
