// export function evaluateMetric(type, value, min, max) {
//   if (value === null || value === undefined || isNaN(value)) {
//     return {
//       status: "Unknown",
//       color: "#71717a",
//       percent: 0,
//       insight: "No data available",
//       action: "Waiting for sensor data",
//     };
//   }

//   // ✅ FIX: Absolute metrics use direct percentage
//   const isAbsolute = type === "humidity" || type === "health";

//   const percent = isAbsolute
//     ? Math.min(100, Math.max(0, value)) // 👈 FIX HERE
//     : Math.min(
//         100,
//         Math.max(0, ((value - min) / (max - min)) * 100)
//       );

//   switch (type) {
//     case "temperature":
//       if (value < 24)
//         return out("Risk", "#ef4444", percent, "Too cold", "Increase temperature");
//       if (value <= 30)
//         return out("Excellent", "#22c55e", percent, "Optimal range", "No action needed");
//       if (value <= 34)
//         return out("Good", "#facc15", percent, "Slightly warm", "Monitor conditions");
//       return out("Risk", "#ef4444", percent, "Too hot", "Improve ventilation");

//     case "humidity":
//       if (value < 55)
//         return out("Risk", "#ef4444", percent, "Too dry", "Add moisture or wet feed");
//       if (value <= 70)
//         return out("Excellent", "#22c55e", percent, "Optimal moisture", "Stable");
//       if (value <= 80)
//         return out("Good", "#facc15", percent, "High humidity", "Monitor mold risk");
//       return out("Risk", "#ef4444", percent, "Excess humidity", "Increase airflow");

//     case "air":
//       if (value < 600)
//         return out("Good", "#22c55e", percent, "Fresh air", "Stable");
//       if (value <= 1000)
//         return out("Excellent", "#22c55e", percent, "Ideal AQ", "No action");
//       if (value <= 1500)
//         return out("Good", "#facc15", percent, "Moderate AQ", "Increase ventilation");
//       return out("Risk", "#ef4444", percent, "Poor AQ", "Ventilation required");

//     case "health":
//       if (value >= 80)
//         return out("Excellent", "#22c55e", percent, "System optimal", "Maintain setup");
//       if (value >= 50)
//         return out("Good", "#facc15", percent, "Moderate stability", "Monitor closely");
//       return out("Risk", "#ef4444", percent, "System stressed", "Immediate action");

//     default:
//       return {
//         status: "Unknown",
//         color: "#71717a",
//         percent: 0,
//         insight: "Invalid metric",
//         action: "Check configuration",
//       };
//   }
// }

// function out(status, color, percent, insight, action) {
//   return { status, color, percent, insight, action };
// }


export function evaluateMetric(type, value) {
  if (value == null || isNaN(value)) {
    return {
      status: "Unknown",
      color: "#71717a",
      percent: 0,
      insight: "Sensor data not available",
      action: "Check sensor connectivity",
    };
  }

  switch (type) {
    case "temperature":
      if (value < 25)
        return out("Risk", "#ef4444", value, "Too cold for BSF metabolism", "Increase temperature");
      if (value <= 32)
        return out("Excellent", "#22c55e", value, "Optimal temperature for BSF growth", "No action needed");
      return out("Risk", "#ef4444", value, "Excess heat stress", "Improve ventilation");

    case "humidity":
      if (value < 45)
        return out("Risk", "#ef4444", value, "Low humidity → dehydration risk", "Increase moisture");
      if (value <= 70)
        return out("Good", "#facc15", value, "Acceptable humidity for BSF", "Monitor regularly");
      return out("Risk", "#ef4444", value, "High humidity → mold risk", "Increase airflow");

    case "air":
      if (value < 800)
        return out("Excellent", "#22c55e", value, "Fresh air conditions", "No action needed");
      if (value <= 1200)
        return out("Good", "#facc15", value, "Moderate air quality", "Ensure ventilation");
      return out("Risk", "#ef4444", value, "Poor air quality", "Ventilation required");

    case "health":
      if (value >= 80)
        return out("Excellent", "#22c55e", value, "BSF growth is healthy", "Maintain conditions");
      if (value >= 60)
        return out("Good", "#facc15", value, "Minor stress detected", "Monitor closely");
      return out("Risk", "#ef4444", value, "Unhealthy BSF environment", "Immediate action required");

    default:
      return out("Info", "#38bdf8", value, "Live sensor reading", "Refer health score");
  }
}

function out(status, color, percent, insight, action) {
  return { status, color, percent, insight, action };
}


