const router = require("express").Router();
const handler = require("./handler");

router.get("/", handler.getPulse);
router.put("/", handler.updateField);
router.post("/generate-link", handler.generateLink)
// router.post("/", auth, handler.create);
module.exports = router;
