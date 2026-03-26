const router = require("express").Router();
const fan = require("../controllers/fan.controller");

router.post("/on", fan.fanOn);
router.post("/off", fan.fanOff);
router.post("/auto", fan.autoMode);

module.exports = router;
