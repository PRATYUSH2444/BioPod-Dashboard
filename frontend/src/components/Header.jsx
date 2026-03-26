import { useEffect, useState } from "react";
import { getLocationStatus } from "../api/api";

export default function Header() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLocationStatus();
        setData(res.data);
      } catch (err) {
        console.error("Location fetch failed");
      }
    };

    fetch();
    const interval = setInterval(fetch, 60000); // every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-zinc-800">
      <div>
        <h1 className="text-lg font-bold text-green-400">BIOPOD AI</h1>
        <p className="text-xs text-zinc-400">
          Bio-Conversion Monitoring System
        </p>
      </div>

      {data && (
        <div className="text-sm text-zinc-300 flex items-center gap-6">
          <span>📍 {data.location}</span>
          <span>🌡 {data.temperature}°C</span>
          <span>💧 {data.humidity}%</span>
          <span>
            🌫 AQI: {data.aqi} ({data.aqi_label})
          </span>
        </div>
      )}
    </header>
  );
}
