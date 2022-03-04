const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.post('/', handler.createOrUpdateDefine);
router.get('/', handler.getDefines);

module.exports = router;
