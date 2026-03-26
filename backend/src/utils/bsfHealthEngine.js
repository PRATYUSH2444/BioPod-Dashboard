/* ================= BSF BIOLOGICAL ENGINE ================= */

// Optimal ranges per stage
const STAGE_RANGES = {
  Egg: {
    temperature: [26, 30],
    humidity: [45, 70],
    air: [500, 900],
    feedWeight: 0,
  },
  Larva: {
    temperature: [27, 32],
    humidity: [45, 70],
    air: [600, 900],
    feedWeight: 0.25,
  },
  Pupa: {
    temperature: [24, 30],
    humidity: [45, 65],
    air: [500, 1000],
    feedWeight: 0.1,
  },
};

// Helper
const scoreRange = (value, min, max) => {
  if (value == null) return 0;
  if (value < min) return Math.round((value / min) * 100);
  if (value > max) return Math.round((max / value) * 100);
  return 100;
};

// Detect stage automatically from age
exports.detectStage = (ageDays) => {
  if (ageDays <= 3) return "Egg";
  if (ageDays <= 17) return "Larva";
  return "Pupa";
};

// MAIN HEALTH CALCULATION
exports.calculateBSFHealth = ({
  sensor,
  feedKg = 0,
  ageDays,
}) => {
  const stage = exports.detectStage(ageDays);
  const range = STAGE_RANGES[stage];

  const tempScore = scoreRange(sensor.temperature, ...range.temperature);
  const humScore  = scoreRange(sensor.humidity, ...range.humidity);
  const airScore  = scoreRange(sensor.air_quality, ...range.air);

  const feedScore =
    range.feedWeight > 0
      ? Math.min(100, feedKg * 20)
      : 100;

  // WEIGHTS
  const score =
    tempScore * 0.35 +
    humScore  * 0.30 +
    airScore  * 0.20 +
    feedScore * range.feedWeight;

  // EXPLAINABLE INSIGHTS
  const insights = [];
  if (humScore < 45) insights.push("Humidity too low → dehydration risk");
  if (humScore > 70) insights.push("High humidity → mold risk");
  if (tempScore < 60) insights.push("Temperature stress detected");
  if (airScore < 60) insights.push("Poor air quality → oxygen stress");
  if (feedScore < 60) insights.push("Insufficient feed → slow growth");

  // HARVEST DELAY PREDICTION
  const delayDays =
    score < 70 ? Math.ceil((70 - score) / 5) : 0;

  return {
    stage,
    health_score: Math.round(score),
    insights,
    predicted_delay_days: delayDays,
  };
};
