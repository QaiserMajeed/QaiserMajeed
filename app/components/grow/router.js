const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.get('/', handler.getGrow);
router.put('/', handler.updateField);
router.post('/', handler.create);
router.get('/result', handler.calcGrow);

module.exports = router;
