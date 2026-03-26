const express = require("express");
const router = express.Router();

const { getInsights } = require("../controllers/insights.controller");

// GET /api/ai/insights
router.get("/", getInsights);

module.exports = router;
