const Sensor = require("../models/SensorData.model");

/* ================= LATEST SENSOR ================= */
const getLatestSensor = async (req, res) => {
  try {
    const latest = await Sensor.findOne()
      .sort({ createdAt: -1 })
      .select(
        "temperature humidity air_quality fan mode health_score createdAt"
      );

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch latest sensor" });
  }
};

/* ================= SENSOR HISTORY ================= */
const getSensorHistory = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;

    const data = await Sensor.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("temperature humidity air_quality health_score createdAt");

    res.json(data.reverse());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sensor history" });
  }
};

module.exports = {
  getLatestSensor,
  getSensorHistory,
};
