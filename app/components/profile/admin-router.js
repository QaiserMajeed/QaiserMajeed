const router = require('express').Router();
const handler = require('./handler');
const admin = require('../../middleware/admin');

router.use(admin);

router.get('/all', handler.getProfiles);
router.get('/:id', handler.getProfileById);
module.exports = router;
