const router = require('express').Router();
const handler = require('./handler');

router.post('/', handler.contactUs);

module.exports = router;
