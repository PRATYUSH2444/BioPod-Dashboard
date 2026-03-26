// const express = require("express");
// const router = express.Router();

// const {
//   getHealthHistory,
//   getLatestHealth,
//   getBSFStatus,
// } = require("../controllers/ai.controller");

// router.get("/health-history", getHealthHistory);
// router.get("/health-latest", getLatestHealth);
// router.get("/bsf-status", getBSFStatus);
// router.post("/bsf-reset", require("../controllers/bsf.controller").resetBSFCycle);
// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getHealthHistory,
  getLatestHealth,
} = require("../controllers/ai.controller");

const {
  getBSFStatus,
  resetBSFCycle,
} = require("../controllers/bsf.controller");

/* ================= HEALTH ================= */

router.get("/health-history", getHealthHistory);
router.get("/health-latest", getLatestHealth);

/* ================= BSF LIFECYCLE ================= */

router.get("/bsf-status", getBSFStatus);
router.post("/bsf-reset", resetBSFCycle);

module.exports = router;
