const router = require('express').Router();
const handler = require('./handler');
const auth = require('../../middleware/auth');

router.get('/', auth, handler.getAllAdmin);
router.get('/:page', auth, handler.getAllAdminWithPagination);
router.get('/search/:query', auth, handler.searchAllAdmin);
router.get('/sort/:type/:orderby/:page', auth, handler.sortingAdmin);
router.delete('/:id', auth, handler.deleteAdmin);

module.exports = router;
