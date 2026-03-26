const BSFBatch = require("../models/BSFBatch");

/**
 * GET /api/ai/bsf-status
 */

const { detectStage } = require("../utils/bsfHealthEngine");

exports.getBSFStatus = async (req, res) => {
  try {
    const deviceId = req.query.device_id || "BSF_001";

    const batch = await BSFBatch.findOne({ device_id: deviceId });
    if (!batch) {
      return res.status(404).json({ error: "BSF batch not found" });
    }

    const ageDays = Math.floor(
      (Date.now() - batch.started_on) / (1000 * 60 * 60 * 24)
    );

    const stage = detectStage(ageDays);

    res.json({
      device_id: deviceId,
      started_on: batch.started_on,
      age_days: ageDays,
      stage,
    });
  } catch (err) {
    res.status(500).json({ error: "BSF status failed" });
  }
};


/**
 * POST /api/ai/bsf-reset
 */
exports.resetBSFCycle = async (req, res) => {
  try {
    const { device_id = "BSF_001", started_on } = req.body;

    const startDate = started_on
      ? new Date(started_on)
      : new Date();

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        error: "Invalid start date",
      });
    }

    await BSFBatch.findOneAndUpdate(
      { device_id },
      { started_on: startDate },
      { upsert: true, new: true }
    );

    return res.json({
      success: true,
      started_on: startDate,
    });
  } catch (err) {
    console.error("❌ BSF RESET ERROR:", err);
    return res.status(500).json({
      error: "Failed to reset BSF cycle",
      details: err.message,
    });
  }
};
