const router = require('express').Router();
const handler = require('./handler');
const admin = require('../../middleware/admin');

router.use(admin);
router.post('/', handler.create);
router.get('/', handler.getCodes);
router.get('/:id', handler.getCode);
router.put('/', handler.changeCode);
router.delete('/', handler.deleteCodes);

module.exports = router;
