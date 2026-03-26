const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    device_id: { type: String, required: true },

    temperature: Number,
    humidity: Number,
    air_quality: Number,

    fan: String,           // ON / OFF
    mode: String,          // AUTO / MANUAL
    sensor_fault: Boolean,
    health_score: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);
