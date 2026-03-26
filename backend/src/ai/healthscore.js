/**
 * Health Score: 0 – 100
 * Based on BSF optimal conditions
 */

module.exports = function calculateHealthScore(data) {
  let score = 100;
  let reasons = [];

  // Temperature (Optimal: 27–32°C)
  if (data.temperature < 24 || data.temperature > 35) {
    score -= 25;
    reasons.push("Temperature outside safe range");
  } else if (data.temperature < 27 || data.temperature > 32) {
    score -= 10;
    reasons.push("Temperature slightly suboptimal");
  }

  // Humidity (Optimal: 60–75%)
  if (data.humidity < 50 || data.humidity > 85) {
    score -= 20;
    reasons.push("Humidity unsafe for BSF");
  } else if (data.humidity < 60 || data.humidity > 75) {
    score -= 8;
    reasons.push("Humidity not ideal");
  }

  // Air Quality (MQ135 proxy)
  if (data.air_quality > 1100) {
    score -= 20;
    reasons.push("Poor air quality detected");
  } else if (data.air_quality > 950) {
    score -= 10;
    reasons.push("Air quality moderately high");
  }

  // Sensor fault safety
  if (data.sensor_fault) {
    score -= 30;
    reasons.push("Sensor fault detected");
  }

  score = Math.max(0, Math.min(score, 100));

  return {
    score,
    status:
      score >= 80 ? "Excellent" :
      score >= 60 ? "Good" :
      score >= 40 ? "Moderate" : "Critical",
    reasons
  };
};
