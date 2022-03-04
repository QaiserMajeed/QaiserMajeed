const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.get('/', handler.getTrialsTriumphs);
router.get('/result', handler.getTrialsTriumphsResult);
router.post('/', handler.create);
router.put('/', handler.updateField);

module.exports = router;
