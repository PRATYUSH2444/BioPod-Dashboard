const express = require("express");
const {
  addFeedInput,
  addFeedOutput,
  getFeedHistory,
  getFeedSummary,
} = require("../controllers/feed.controller");

const router = express.Router();

router.post("/input", addFeedInput);
router.post("/output", addFeedOutput);
router.get("/history", getFeedHistory);
router.get("/summary", getFeedSummary);

module.exports = router;
