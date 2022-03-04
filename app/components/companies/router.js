const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.get('/', handler.getCompanies);
router.post('/', handler.createCompany);

module.exports = router;
