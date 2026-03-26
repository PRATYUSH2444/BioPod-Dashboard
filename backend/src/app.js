const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= REQUEST LOGGER ================= */
// Logs every incoming request (very useful for debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

/* ================= ROOT HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    project: "BIOPOD",
    status: "Backend running",
    mqtt: "active",
    database: "MongoDB Atlas",
    ai: "enabled",
  });
});

/* ================= API ROUTES ================= */
app.use("/api/fan", require("./routes/fan.routes"));
app.use("/api/sensors", require("./routes/sensor.routes"));
app.use("/api/ai", require("./routes/ai.routes"));
app.use("/api/feed", require("./routes/feed.routes"));
app.use("/api/aira", require("./routes/aira.routes"));
app.use("/api/location", require("./routes/location.routes"));
app.use("/api/ai/insights", require("./routes/insights.routes"));
app.use("/api/ai", aiRoutes);



/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

module.exports = app;
