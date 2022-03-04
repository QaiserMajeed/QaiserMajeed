const router = require('express').Router();
const handler = require('./handler');

router.get('/generate', handler.generateCode);
router.get('/check', handler.checkCode);

module.exports = router;
