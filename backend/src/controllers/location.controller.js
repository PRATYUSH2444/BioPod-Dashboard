const axios = require("axios");
const getAqiLabel = require("../utils/aqi");

const LAT = 22.3039;   // Ratanpar (approx)
const LON = 70.8022;
const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getLocationStatus = async (req, res) => {
  try {
    // Weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: LAT,
          lon: LON,
          units: "metric",
          appid: API_KEY,
        },
      }
    );

    // Air Pollution (AQI)
    const airRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution`,
      {
        params: {
          lat: LAT,
          lon: LON,
          appid: API_KEY,
        },
      }
    );

    const temperature = weatherRes.data.main.temp;
    const humidity = weatherRes.data.main.humidity;

    // OpenWeather AQI scale: 1–5
    const aqiIndex = airRes.data.list[0].main.aqi;

    // Convert to human readable AQI-like scale
    const aqiMap = {
      1: 30,
      2: 80,
      3: 150,
      4: 250,
      5: 350,
    };

    const aqi = aqiMap[aqiIndex];
    const aqi_label = getAqiLabel(aqi);

    res.json({
      location: "Ratanpar, Rajkot",
      temperature,
      humidity,
      aqi,
      aqi_label,
    });
  } catch (err) {
    console.error("❌ Location API error:", err.message);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
};
