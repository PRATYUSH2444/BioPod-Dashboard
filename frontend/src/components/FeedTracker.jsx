import { useEffect, useState } from "react";
import {
  addFeedInput,
  addFeedOutput,
  getFeedHistory,
  getFeedSummary,
} from "../api/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function FeedTracker() {
  const [inputKg, setInputKg] = useState("");
  const [outputKg, setOutputKg] = useState("");
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const h = await getFeedHistory();
    const s = await getFeedSummary();

    setHistory(
      h.data.map((d) => ({
        efficiency: d.efficiency_percent,
        time: new Date(d.createdAt).toLocaleTimeString(),
      }))
    );

    setSummary(s.data);
  }

  async function submitInput() {
    if (!inputKg) return;
    setLoading(true);
    await addFeedInput({
      device_id: "BSF_001",
      input_waste_kg: Number(inputKg),
    });
    setInputKg("");
    await refresh();
    setLoading(false);
  }

  async function submitOutput() {
    if (!outputKg) return;
    setLoading(true);
    await addFeedOutput({
      device_id: "BSF_001",
      output_fertilizer_kg: Number(outputKg),
    });
    setOutputKg("");
    await refresh();
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-green-400">
        ♻ Feed → Fertilizer Efficiency
      </h2>

      {/* INPUT CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputBlock
          label="Waste Input (kg)"
          value={inputKg}
          setValue={setInputKg}
          action={submitInput}
          color="green"
          disabled={loading}
        />

        <InputBlock
          label="Fertilizer Output (kg)"
          value={outputKg}
          setValue={setOutputKg}
          action={submitOutput}
          color="blue"
          disabled={loading}
        />
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Summary label="Total Waste" value={`${summary.total_input_kg} kg`} />
          <Summary
            label="Total Fertilizer"
            value={`${summary.total_output_kg} kg`}
          />
          <Summary
            label="Efficiency"
            value={`${summary.efficiency_percent}%`}
            highlight
          />
        </div>
      )}

      {/* EFFICIENCY GRAPH */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-2">
          Efficiency Trend (%)
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={history}>
            <XAxis
              dataKey="time"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />

            {/* Target efficiency */}
            <ReferenceLine
              y={40}
              stroke="#facc15"
              strokeDasharray="4 4"
              label={{
                value: "Target 40%",
                fill: "#facc15",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #27272a",
              }}
              formatter={(v) => [`${v}%`, "Efficiency"]}
            />

            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function InputBlock({ label, value, setValue, action, color, disabled }) {
  const buttonColor =
    color === "green"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
      />
      <button
        onClick={action}
        disabled={disabled}
        className={`w-full ${buttonColor} transition rounded py-2 text-sm font-medium`}
      >
        Submit
      </button>
    </div>
  );
}

function Summary({ label, value, highlight }) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-green-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
