const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.get('/', handler.getImpact);
router.get('/life-purpose', handler.getLifePurpose);
router.get('/promise-statements', handler.getPromiseStatements);
router.post('/', handler.create);
router.put('/', handler.updateField);

module.exports = router;
