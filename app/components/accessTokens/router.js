const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');
const uploadFile = require("../../middleware/upload");

router.post('/', handler.createAccessTokens);
router.post('/createAccessTokensWithNewUsers', handler.createAccessTokensWithNewUsers)
router.post('/createTokenCSV', uploadFile,handler.createTokenCSV)



module.exports = router;
