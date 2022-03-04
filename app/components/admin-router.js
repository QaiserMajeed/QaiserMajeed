const router = require('express').Router();

router.use('/partner', require('./partner/admin-router'));
router.use('/profile', require('./profile/admin-router'));
router.use('/code', require('./registration-code/admin-router'));

module.exports = router;
