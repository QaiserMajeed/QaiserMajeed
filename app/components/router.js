const router = require('express').Router();

// router.use('/admin', require('./admin/router'));
router.use('/align', require('./trialstriumphs/router'));
router.use('/partner', require('./partner/router'));
router.use('/auth', require('./auth/router'));
router.use('/impact', require('./impact/router'));
router.use('/grow', require('./grow/router'));
router.use('/profile', require('./profile/router'));
router.use('/score', require('./score/router'));
router.use('/pulse', require('./purposePulse/router'));
router.use('/contact-us', require('./contactUs/router'));
router.use('/code', require('./registration-code/router'));
router.use('/stripe', require('./stripe/router'));
router.use('/accessTokens', require('./accessTokens/router'));

module.exports = router;
