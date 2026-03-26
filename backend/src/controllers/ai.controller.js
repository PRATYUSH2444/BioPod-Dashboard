const Sensor = require("../models/SensorData.model");
const BSFBatch = require("../models/BSFBatch");
const Feed = require("../models/FeedRecord.model");
const { calculateBSFHealth } = require("../utils/bsfHealthEngine");
/* ================= HELPERS ================= */

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function scoreRange(value, min, max) {
  if (value == null) return 0;
  if (value < min) return clamp((value / min) * 100, 0, 100);
  if (value > max) return clamp((max / value) * 100, 0, 100);
  return 100;
}

/* ================= HEALTH COMPUTATION ================= */
function computeBSFHealth(sensor, stage) {
  // BSF optimal ranges (Larva-focused)
  const TEMP = scoreRange(sensor.temperature, 27, 32);
  const HUM  = scoreRange(sensor.humidity, 60, 75);
  const AIR  = scoreRange(sensor.air_quality, 600, 900);

  // Stage-aware weights
  const weights = {
    Egg:   { t: 0.3, h: 0.5, a: 0.2 },
    Larva: { t: 0.4, h: 0.35, a: 0.25 },
    Pupa:  { t: 0.3, h: 0.2, a: 0.5 },
  };

  const w = weights[stage] || weights.Larva;

  const score =
    TEMP * w.t +
    HUM  * w.h +
    AIR  * w.a;

  return Math.round(score);
}

/* ================= HEALTH HISTORY ================= */
exports.getHealthHistory = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;

    const data = await Sensor.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    const history = data.reverse().map(d => ({
      time: d.createdAt,
      health_score: computeBSFHealth(d, "Larva"),
    }));

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch health history" });
  }
};

/* ================= LATEST HEALTH ================= */
exports.getLatestHealth = async (req, res) => {
  try {
    const sensor = await Sensor.findOne().sort({ createdAt: -1 });
    const batch = await BSFBatch.findOne({ device_id: "BSF_001" });

    if (!sensor || !batch) {
      return res.json({ health_score: null });
    }

    const ageDays = Math.floor(
      (Date.now() - batch.started_on) / (1000 * 60 * 60 * 24)
    );

    const feedKg = await Feed.aggregate([
      { $match: { type: "input" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    const result = calculateBSFHealth({
      sensor,
      feedKg: feedKg[0]?.total || 0,
      ageDays,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Health calculation failed" });
  }
};
