// import axios from "axios";

// /**
//  * ==============================
//  * CENTRAL AXIOS INSTANCE
//  * ==============================
//  * Single source of truth for backend connection
//  */
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   timeout: 8000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* =========================
//    SENSOR APIs
// ========================= */

// // Latest sensor snapshot (KPI cards)
// export const getLatestSensor = () =>
//   API.get("/sensors/latest");

// // Sensor history (graphs)
// export const getSensorHistory = (limit = 50) =>
//   API.get(`/sensors/history?limit=${limit}`);

// /* =========================
//    AI APIs
// ========================= */

// // Latest health score (HealthGauge + KPI)
// export const getLatestHealth = () =>
//   API.get("/ai/health-latest");

// // Health score history (Health graph)
// export const getHealthHistory = (limit = 50) =>
//   API.get(`/ai/health-history?limit=${limit}`);

// // BSF lifecycle / stage status
// export const getBSFStatus = (deviceId = "BSF_001") => {
//   started_on: "2026-01-01T10:00:00.000Z"
//   return API.get(`/ai/bsf-status?device_id=${deviceId}`);
// };

// /* =========================
//    FEED & FERTILIZER APIs
// ========================= */

// // Add waste input
// export const addFeedInput = (data) =>
//   API.post("/feed/input", data);

// // Add fertilizer output
// export const addFeedOutput = (data) =>
//   API.post("/feed/output", data);

// // Feed history (table / graph)
// export const getFeedHistory = () =>
//   API.get("/feed/history");

// // Feed efficiency summary
// export const getFeedSummary = () =>
//   API.get("/feed/summary");

// /* =========================
//    FAN CONTROL APIs
// ========================= */

// export const fanOn = () =>
//   API.post("/fan/on");

// export const fanOff = () =>
//   API.post("/fan/off");

// export const fanAuto = () =>
//   API.post("/fan/auto");

// /* =========================
//    AIRA AI CHAT API
// ========================= */

// export const sendAiraMessage = (message) =>
//   API.post("/aira/chat", { message });

// export const getLocationStatus = () =>
//   API.get("/location/status");

// export const getAIInsights = () =>
//   API.get("/ai/insights");



// /* =========================
//    DEFAULT EXPORT
// ========================= */

// export default API;



import axios from "axios";

/**
 * ==============================
 * CENTRAL AXIOS INSTANCE
 * ==============================
 */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   SENSOR APIs
========================= */

export const getLatestSensor = () =>
  API.get("/sensors/latest");

export const getSensorHistory = (limit = 50) =>
  API.get(`/sensors/history?limit=${limit}`);

/* =========================
   AI APIs
========================= */

export const getLatestHealth = () =>
  API.get("/ai/health-latest");

export const getHealthHistory = (limit = 50) =>
  API.get(`/ai/health-history?limit=${limit}`);

/* =========================
   BSF LIFECYCLE APIs
========================= */

// Get BSF lifecycle status
export const getBSFStatus = (deviceId = "BSF_001") =>
  API.get(`/ai/bsf-status?device_id=${deviceId}`);

// Reset BSF lifecycle (start new batch)
// export const resetBSFCycle = (deviceId = "BSF_001") =>
//   API.post(`/ai/bsf-reset`, { device_id: deviceId });

export const resetBSFCycle = (deviceId = "BSF_001", startedOn = null) =>
  API.post("/ai/bsf-reset", {
    device_id: deviceId,
    started_on: startedOn,
  });



/* =========================
   FEED APIs
========================= */

export const addFeedInput = (data) =>
  API.post("/feed/input", data);

export const addFeedOutput = (data) =>
  API.post("/feed/output", data);

export const getFeedHistory = () =>
  API.get("/feed/history");

export const getFeedSummary = () =>
  API.get("/feed/summary");

/* =========================
   FAN CONTROL APIs
========================= */

export const fanOn = () =>
  API.post("/fan/on");

export const fanOff = () =>
  API.post("/fan/off");

export const fanAuto = () =>
  API.post("/fan/auto");

/* =========================
   AIRA AI CHAT
========================= */

export const sendAiraMessage = (message) =>
  API.post("/aira/chat", { message });

export const getLocationStatus = () =>
  API.get("/location/status");

export const getAIInsights = () =>
  API.get("/ai/insights");

/* =========================
   DEFAULT EXPORT
========================= */

export default API;
