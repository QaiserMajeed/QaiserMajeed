const router = require('express').Router();
const admin = require('../../middleware/admin');
const handler = require('./handler');

router.use(admin);
router.get('/', handler.search);
router.get('/:id', handler.getOne);
router.put('/', handler.changePartner);

module.exports = router;
