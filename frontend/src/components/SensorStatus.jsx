import { useEffect, useState } from "react";
import { getLatestSensor } from "../api/api";

export default function SensorStatus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getLatestSensor().then(res => setData(res.data));
    const interval = setInterval(() => {
      getLatestSensor().then(res => setData(res.data));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={card}>
      <h2>📡 Live Environment</h2>
      <p>🌡 Temp: {data.temperature} °C</p>
      <p>💧 Humidity: {data.humidity} %</p>
      <p>🫁 Air Quality: {data.air_quality}</p>
      <p>🌀 Fan: {data.fan}</p>
      <p>🤖 Mode: {data.mode}</p>
    </div>
  );
}

const card = {
  padding: "20px",
  borderRadius: "10px",
  background: "#1c1c1c",
  color: "#fff",
};
