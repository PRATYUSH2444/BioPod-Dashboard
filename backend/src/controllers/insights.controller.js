const Sensor = require("../models/SensorData.model");

/* ================= HEALTH SCORE CALC ================= */
function calculateHealth({ temperature, humidity, air_quality }) {
  let score = 100;

  // Temperature (ideal: 27–32)
  if (temperature < 27) score -= (27 - temperature) * 5;
  if (temperature > 32) score -= (temperature - 32) * 5;

  // Humidity (ideal: 55–70)
  if (humidity < 55) score -= (55 - humidity) * 2;
  if (humidity > 70) score -= (humidity - 70) * 2;

  // Air quality (ideal < 900)
  if (air_quality > 900) score -= (air_quality - 900) * 0.03;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/* ================= AI INSIGHTS ================= */
exports.getInsights = async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });

    if (!latest) {
      return res.json([
        { level: "info", text: "📡 Waiting for sensor data…" },
      ]);
    }

    const health_score = calculateHealth(latest);
    const insights = [];

    /* -------- TEMPERATURE -------- */
    if (latest.temperature < 27)
      insights.push({ level: "warning", text: "🌡 Temperature slightly low" });
    else if (latest.temperature > 32)
      insights.push({ level: "danger", text: "🔥 Temperature too high" });
    else
      insights.push({ level: "good", text: "🌡 Temperature optimal" });

    /* -------- HUMIDITY -------- */
    if (latest.humidity < 55)
      insights.push({ level: "warning", text: "⚠️ Humidity unsafe for BSF" });
    else if (latest.humidity > 70)
      insights.push({ level: "danger", text: "💧 Excess humidity detected" });
    else
      insights.push({ level: "good", text: "💧 Humidity stable" });

    /* -------- AIR QUALITY -------- */
    if (latest.air_quality > 1200)
      insights.push({ level: "danger", text: "🚨 Poor air quality" });
    else if (latest.air_quality > 900)
      insights.push({ level: "warning", text: "🌫 Air quality moderately high" });
    else
      insights.push({ level: "good", text: "🌫 Air quality healthy" });

    /* -------- FAN -------- */
    insights.push({
      level: "info",
      text:
        latest.mode === "AUTO"
          ? "🌀 Fan running in AUTO mode"
          : `🌀 Fan manually ${latest.fan}`,
    });

    /* -------- HEALTH -------- */
    if (health_score >= 80)
      insights.push({
        level: "good",
        text: "🧠 AI predicts stable and healthy BSF growth",
      });
    else if (health_score >= 60)
      insights.push({
        level: "warning",
        text: "🧠 AI predicts moderate growth conditions",
      });
    else
      insights.push({
        level: "danger",
        text: "⚠️ AI detected unstable growth conditions",
      });

    res.json(insights);
  } catch (err) {
    console.error("AI Insights error:", err.message);
    res.status(500).json([
      { level: "danger", text: "❌ AI engine error" },
    ]);
  }
};
