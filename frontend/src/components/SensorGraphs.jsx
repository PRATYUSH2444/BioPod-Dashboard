import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getSensorHistory, getHealthHistory } from "../api/api";

export default function SensorGraphs() {
  const [sensorData, setSensorData] = useState([]);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const sensorRes = await getSensorHistory();
        const healthRes = await getHealthHistory();

        setSensorData(
          sensorRes.data.map(d => ({
            time: new Date(d.createdAt).toLocaleTimeString(),
            temperature: d.temperature,
            humidity: d.humidity,
            air_quality: d.air_quality,
          }))
        );

        setHealthData(
          healthRes.data.map(d => ({
            time: new Date(d.time).toLocaleTimeString(),
            health_score: d.health_score,
          }))
        );
      } catch (err) {
        console.error("Graph fetch failed", err);
      }
    };

    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Graph
        title="Temperature (°C)"
        data={sensorData}
        keyName="temperature"
        color="#ef4444"
      />

      <Graph
        title="Humidity (%)"
        data={sensorData}
        keyName="humidity"
        color="#3b82f6"
      />

      <Graph
        title="Air Quality (ppm)"
        data={sensorData}
        keyName="air_quality"
        color="#f59e0b"
      />

      <Graph
        title="Health Score (%)"
        data={healthData}
        keyName="health_score"
        color="#22c55e"
      />

    </div>
  );
}

/* ================= GRAPH COMPONENT ================= */

function Graph({ title, data, keyName, color }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-64">
      <p className="text-sm text-zinc-400 mb-2">{title}</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fill: "#a1a1aa" }} />
          <YAxis tick={{ fill: "#a1a1aa" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={keyName}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
