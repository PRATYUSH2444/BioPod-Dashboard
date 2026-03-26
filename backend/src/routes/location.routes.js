const express = require("express");
const router = express.Router();
const { getLocationStatus } = require("../controllers/location.controller");

router.get("/status", getLocationStatus);

module.exports = router;
