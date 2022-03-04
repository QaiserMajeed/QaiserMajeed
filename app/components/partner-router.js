const router = require('express').Router();
const partner = require('../middleware/partner');

router.use(partner);

module.exports = router;
