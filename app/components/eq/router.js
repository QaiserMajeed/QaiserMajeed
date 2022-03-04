const router = require('express').Router();
const handler = require('./handler');

router.post('/', handler.create);

module.exports = router;
