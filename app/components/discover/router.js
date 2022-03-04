const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');

router.use(auth);
router.get('/', handler.getDiscovers);
// selected identity and impacts
router.get('/identity', handler.getIdentities);
router.post('/identity', handler.createDiscoverIdentity);

router.get('/impact', handler.getDiscoverImpacts);
router.get('/impact/:id', handler.getImpactById);

router.post('/impact', handler.createDiscoverImpact);

router.get('/impact-list', handler.getImpactList);

module.exports = router;
