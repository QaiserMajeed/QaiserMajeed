const router = require('express').Router();
const handler = require('./handler');
const auth = require('../../middleware/auth');

router.get('/cohorts', auth, handler.getCohorts);
router.get('/', auth, handler.getCodes);
// Registration Code
router.post('/registration', auth, handler.newRegistrationCode);

module.exports = router;
