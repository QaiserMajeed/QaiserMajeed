const router = require('express').Router();
const partner = require('../../middleware/partner');
const handler = require('./handler');

router.use(partner);
router.get('/profile', handler.getProfile);
router.get('/users', handler.getPartnerUsers);
router.get('/users/:id', handler.getPartnerUserById);

module.exports = router;
