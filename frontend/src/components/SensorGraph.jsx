import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SensorGraph({ title, data, dataKey, color, unit }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 w-full h-full">
      
      {/* Graph title */}
      <h3 className="text-sm text-zinc-300 mb-3">
        {title}
      </h3>

      {/* Graph container */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          
          <XAxis
            dataKey="createdAt"
            tick={false}
          />

          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
          />

          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleTimeString()
            }
            formatter={(value) => [`${value} ${unit}`, title]}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
