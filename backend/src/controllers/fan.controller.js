const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_BROKER);
const CONTROL_TOPIC = "biopod/bsf/BSF_001/control";

exports.fanOn = (req, res) => {
  client.publish(CONTROL_TOPIC, JSON.stringify({ fan: "ON", mode: "MANUAL" }));
  res.json({ status: "Fan turned ON (Manual)" });
};

exports.fanOff = (req, res) => {
  client.publish(CONTROL_TOPIC, JSON.stringify({ fan: "OFF", mode: "MANUAL" }));
  res.json({ status: "Fan turned OFF (Manual)" });
};

exports.autoMode = (req, res) => {
  client.publish(CONTROL_TOPIC, JSON.stringify({ mode: "AUTO" }));
  res.json({ status: "Fan set to AUTO mode" });
};
