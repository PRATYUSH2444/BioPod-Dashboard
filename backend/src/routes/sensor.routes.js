const express = require("express");
const router = express.Router();

const {
  getLatestSensor,
  getSensorHistory,
} = require("../controllers/sensor.controller");

/* ================= ROUTES ================= */

// Latest sensor snapshot
router.get("/latest", getLatestSensor);

// Sensor history (graphs)
router.get("/history", getSensorHistory);

module.exports = router;
