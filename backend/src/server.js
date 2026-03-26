require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const connectMQTT = require("./mqtt/mqttClient");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1️⃣ Connect MongoDB Atlas
    await connectDB();

    // 2️⃣ Start HTTP Server only after DB is ready
    const server = app.listen(PORT, () => {
      console.log(`🚀 BIOPOD backend running on port ${PORT}`);
    });

    // 3️⃣ Start MQTT Subscriber after server is up
    connectMQTT();

    // Optional: handle server errors
    server.on("error", (err) => {
      console.error("❌ Server error:", err.message);
      process.exit(1);
    });
  } catch (err) {
    console.error("❌ Startup failure:", err.message);
    process.exit(1);
  }
}

startServer();
