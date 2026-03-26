const mqtt = require("mqtt");
const SensorData = require("../models/SensorData.model");

const MQTT_BROKER = process.env.MQTT_BROKER;
const SENSOR_TOPIC = "biopod/bsf/BSF_001/sensors";

let client;

/* =========================
   HEALTH SCORE CALCULATION
========================= */
function calculateHealthScore({ temperature, humidity, air_quality }) {
  // -------- Temperature Score (Optimal: 27–30°C)
  let tempScore = 100;
  if (temperature < 27) {
    tempScore = 100 - (27 - temperature) * 5;
  } else if (temperature > 30) {
    tempScore = 100 - (temperature - 30) * 5;
  }
  tempScore = Math.max(0, Math.min(100, tempScore));

  // -------- Humidity Score (Optimal: 50–65%)
  let humidityScore = 100;
  if (humidity < 50) {
    humidityScore = 100 - (50 - humidity) * 3;
  } else if (humidity > 65) {
    humidityScore = 100 - (humidity - 65) * 3;
  }
  humidityScore = Math.max(0, Math.min(100, humidityScore));

  // -------- Air Quality Score (Optimal: <800 ppm)
  let airScore = 100;
  if (air_quality > 800) {
    airScore = 100 - (air_quality - 800) * 0.05;
  }
  airScore = Math.max(0, Math.min(100, airScore));

  // -------- Weighted Final Score
  const finalScore =
    tempScore * 0.35 +
    humidityScore * 0.35 +
    airScore * 0.30;

  return Math.round(finalScore);
}


/* =========================
   MQTT CONNECTION
========================= */
function connectMQTT() {
  console.log("🔌 Connecting to MQTT broker...");

  client = mqtt.connect(MQTT_BROKER);

  client.on("connect", () => {
    console.log("✅ MQTT connected");

    client.subscribe(SENSOR_TOPIC, (err) => {
      if (err) {
        console.error("❌ Subscription error:", err.message);
      } else {
        console.log(`📡 Subscribed to ${SENSOR_TOPIC}`);
      }
    });
  });

  /* =========================
     MQTT MESSAGE HANDLER
  ========================= */
  client.on("message", async (topic, message) => {
    console.log("\n📥 RAW MQTT MESSAGE");
    console.log("Topic:", topic);

    try {
      const payload = message.toString();
      console.log("Payload:", payload);

      const data = JSON.parse(payload);

      console.log("📡 Parsed Sensor Data:", data);

      // ✅ Calculate health score
      const health_score = calculateHealthScore(data);

      // ✅ Prepare final document
      const record = {
        device_id: data.device_id,
        temperature: data.temperature,
        humidity: data.humidity,
        air_quality: data.air_quality,
        fan: data.fan,
        mode: data.mode,
        sensor_fault: data.sensor_fault ?? false,

        // 🔥 CRITICAL FIELD (FIXES EVERYTHING)
        health_score,

        // ✅ Ensure correct timestamp
        createdAt: new Date(),
      };

      await SensorData.create(record);

      console.log(
        `💾 Data saved to MongoDB Atlas | Health Score: ${health_score}% | ${record.createdAt.toISOString()}`
      );
    } catch (err) {
      console.error("❌ MQTT / DB Error:", err.message);
    }
  });

  client.on("error", (err) => {
    console.error("❌ MQTT Connection Error:", err.message);
  });
}



module.exports = connectMQTT;
