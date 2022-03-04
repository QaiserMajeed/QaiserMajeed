const router = require('express').Router();
const handler = require('./handler');
const auth = require('../../middleware/auth');
// EPA
router.post('/check-code', handler.checkEPAcode);
router.post('/registration-code', auth, handler.createEPAcode);
router.get('/cohorts', auth, handler.getEpaCohorts);
router.get('/results', auth, handler.getEPAResults);
router.post('/team-reports', auth, handler.getTeamReports);
router.get('/codes', auth, handler.getEPACodes);
router.post('/individual-report', handler.createIndividualReport);
router.get(
  '/individual-report/:epa_id',
  handler.getIndividualEpaReport,
);

router.post('/team-report', auth, handler.createTeam);
router.get('/team-report/:id', handler.getTeamResults);

module.exports = router;
