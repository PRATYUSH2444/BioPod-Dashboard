import { useEffect, useState } from "react";
import {
  fanOn,
  fanOff,
  fanAuto,
  getLatestSensor,
} from "../api/api";

export default function FanControl() {
  const [fan, setFan] = useState("—");
  const [mode, setMode] = useState("—");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= FETCH CURRENT STATE ================= */
  async function fetchStatus() {
    try {
      const res = await getLatestSensor();
      setFan(res.data.fan);
      setMode(res.data.mode);
      setError(null);
    } catch (err) {
      setError("Unable to fetch fan status");
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ================= ACTION HANDLER ================= */
  async function handleClick(action) {
    setLoading(true);
    setError(null);

    try {
      if (action === "ON") await fanOn();
      if (action === "OFF") await fanOff();
      if (action === "AUTO") await fanAuto();

      // wait for ESP32 → MQTT → DB update
      setTimeout(fetchStatus, 1000);
    } catch (err) {
      setError("Fan command failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-zinc-200 mb-3">
        Fan Control
      </h3>

      {/* STATUS */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <p className="text-zinc-400 text-xs">Mode</p>
          <p className="font-medium text-green-400">{mode}</p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs">Fan</p>
          <p
            className={`font-medium ${
              fan === "ON" ? "text-green-400" : "text-red-400"
            }`}
          >
            {fan}
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleClick("ON")}
          disabled={loading}
          className="bg-zinc-800 hover:bg-green-600 hover:text-black transition rounded-lg py-2 text-sm"
        >
          ON
        </button>

        <button
          onClick={() => handleClick("OFF")}
          disabled={loading}
          className="bg-zinc-800 hover:bg-red-600 hover:text-white transition rounded-lg py-2 text-sm"
        >
          OFF
        </button>

        <button
          onClick={() => handleClick("AUTO")}
          disabled={loading}
          className="bg-zinc-800 hover:bg-blue-600 hover:text-white transition rounded-lg py-2 text-sm"
        >
          AUTO
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-400 mt-3">{error}</p>
      )}

      {/* INFO */}
      <p className="text-xs text-zinc-500 mt-3">
        AUTO lets BIOPOD AI control the fan based on health score.
      </p>
    </div>
  );
}
