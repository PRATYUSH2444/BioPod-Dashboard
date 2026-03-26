import { useEffect, useState } from "react";
import { getLatestSensor, getHealthHistory } from "../api/api";

export default function LiveDataCards() {
  const [sensor, setSensor] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const sensorRes = await getLatestSensor();
        setSensor(sensorRes.data);

        const healthRes = await getHealthHistory();
        if (healthRes.data.length > 0) {
          setHealth(
            healthRes.data[healthRes.data.length - 1].health_score
          );
        }
      } catch (err) {
        console.error("Live card fetch failed", err);
      }
    }

    fetchData();

    // optional auto refresh every 5s
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ title, value, unit, color }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
      <p className="text-xs text-zinc-400">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {value ?? "--"} {unit}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card
        title="Temperature"
        value={sensor?.temperature}
        unit="°C"
        color="text-red-400"
      />
      <Card
        title="Humidity"
        value={sensor?.humidity}
        unit="%"
        color="text-blue-400"
      />
      <Card
        title="Air Quality"
        value={sensor?.air_quality}
        unit="ppm"
        color="text-green-400"
      />
      <Card
        title="Health Score"
        value={health}
        unit="%"
        color="text-yellow-400"
      />
    </div>
  );
}
