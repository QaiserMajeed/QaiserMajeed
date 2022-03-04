const router = require("express").Router();
const handler = require("./handler");
const auth = require("../../middleware/auth");

router.get("/", auth, handler.getPurpose);
router.get("/score", auth, handler.getScore);
router.get("/fetchPulse", auth, handler.getPulse);
router.get("/dna", auth, handler.getDNA);
router.get("/emotionalIntl", handler.getEmotionalIntl);
router.get("/result", auth, handler.getResult);
router.put("/", auth, handler.updateField);
router.post("/", auth, handler.create);
router.post("/purpose-pulse-link", handler.generateLink);
// for not authorized users
router.post("/calc-score", handler.calcScore);
router.post("/calc-eq", handler.calcEqScore);
module.exports = router;
