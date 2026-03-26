// import { useEffect, useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { getLatestSensor, getHealthHistory } from "../api/api";
// import KpiDetailModal from "./KpiDetailModal";
// import { evaluateMetric } from "../utils/aiLogic";

// export default function KPICards() {
//   const [sensor, setSensor] = useState(null);
//   const [health, setHealth] = useState(null);
//   const [activeCard, setActiveCard] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const s = await getLatestSensor();
//       setSensor(s.data);

//       const h = await getHealthHistory();
//       if (h.data.length) {
//         setHealth(h.data[h.data.length - 1].health_score);
//       }
//     }

//     fetchData();
//     const i = setInterval(fetchData, 5000);
//     return () => clearInterval(i);
//   }, []);

//   const cards = [
//     {
//       type: "temperature",
//       label: "Temperature",
//       value: sensor?.temperature,
//       unit: "°C",
//       min: 20,
//       max: 40,
//     },
//     {
//       type: "humidity",
//       label: "Humidity",
//       value: sensor?.humidity,
//       unit: "%",
//       min: 40,
//       max: 80,
//     },
//     {
//       type: "air",
//       label: "Air Quality",
//       value: sensor?.air_quality,
//       unit: "ppm",
//       min: 400,
//       max: 1500,
//     },
//     {
//       type: "health",
//       label: "Health Score",
//       value: health,
//       unit: "%",
//       min: 0,
//       max: 100,
//     },
//   ];

//   return (
//     <>
//       <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         {cards.map((c) => {
//           const ai = evaluateMetric(c.type, c.value, c.min, c.max);

//           return (
//             <KpiCard
//               key={c.type}
//               {...c}
//               ai={ai}
//               onClick={() =>
//                 setActiveCard({
//                   ...c,
//                   ai,
//                 })
//               }
//             />
//           );
//         })}
//       </section>

//       <KpiDetailModal
//         open={!!activeCard}
//         onClose={() => setActiveCard(null)}
//         title={activeCard?.label}
//         value={
//           activeCard?.value !== null && activeCard?.value !== undefined
//             ? `${activeCard.value}${activeCard.unit}`
//             : "--"
//         }
//         insight={activeCard?.ai?.insight}
//         action={activeCard?.ai?.action}
//       />
//     </>
//   );
// }

// /* ================= SINGLE KPI CARD ================= */

// function KpiCard({ label, value, unit, ai, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="relative cursor-pointer group"
//     >
//       {/* Glow */}
//       <div
//         className="absolute -inset-1 rounded-2xl blur-xl opacity-40 group-hover:opacity-70"
//         style={{ backgroundColor: ai.color }}
//       />

//       <div className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800
//                       rounded-2xl p-5 h-[260px]
//                       flex flex-col items-center justify-between transition">
//         <p className="text-sm text-zinc-400">{label}</p>

//         <div className="w-24 h-24">
//           <CircularProgressbar
//             value={ai.percent}
//             text={value !== undefined ? `${value}${unit}` : "--"}
//             styles={buildStyles({
//               pathColor: ai.color,
//               trailColor: "#27272a",
//               textColor: "#e5e7eb",
//               filter: `drop-shadow(0 0 10px ${ai.color})`,
//             })}
//           />
//         </div>

//         <p className="text-sm font-semibold" style={{ color: ai.color }}>
//           {ai.status}
//         </p>

//         <p className="text-xs text-zinc-500">Click for details</p>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getLatestSensor, getLatestHealth } from "../api/api";
import KpiDetailModal from "./KpiDetailModal";
import { evaluateMetric } from "../utils/aiLogic";

export default function KPICards() {
  const [sensor, setSensor] = useState(null);
  const [health, setHealth] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const s = await getLatestSensor();
      setSensor(s.data);

      const h = await getLatestHealth();
      setHealth(h.data?.health_score ?? null);
    }

    fetchData();
    const i = setInterval(fetchData, 5000);
    return () => clearInterval(i);
  }, []);

  const cards = [
    {
      type: "temperature",
      label: "Temperature",
      value: sensor?.temperature,
      unit: "°C",
    },
    {
      type: "humidity",
      label: "Humidity",
      value: sensor?.humidity,
      unit: "%",
    },
    {
      type: "air",
      label: "Air Quality",
      value: sensor?.air_quality,
      unit: "ppm",
    },
    {
      type: "health",
      label: "Health Score",
      value: health,
      unit: "%",
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((c) => {
          const ai = evaluateMetric(c.type, c.value);

          return (
            <KpiCard
              key={c.type}
              {...c}
              ai={ai}
              onClick={() =>
                setActiveCard({
                  ...c,
                  ai,
                })
              }
            />
          );
        })}
      </section>

      <KpiDetailModal
        open={!!activeCard}
        onClose={() => setActiveCard(null)}
        title={activeCard?.label}
        value={
          activeCard?.value !== null && activeCard?.value !== undefined
            ? `${activeCard.value}${activeCard.unit}`
            : "--"
        }
        insight={activeCard?.ai?.insight}
        action={activeCard?.ai?.action}
      />
    </>
  );
}

/* ================= SINGLE KPI CARD ================= */

// function KpiCard({ label, value, unit, ai, onClick }) {
//   return (
//     <div onClick={onClick} className="relative cursor-pointer group">
//       <div
//         className="absolute -inset-1 rounded-2xl blur-xl opacity-40 group-hover:opacity-70"
//         style={{ backgroundColor: ai.color }}
//       />

//       <div className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800
//                       rounded-2xl p-5 h-[260px]
//                       flex flex-col items-center justify-between transition">
//         <p className="text-sm text-zinc-400">{label}</p>

//         <div className="w-24 h-24">
//           <CircularProgressbar
//             value={ai.percent}
//             text={value !== undefined && value !== null ? `${value}${unit}` : "--"}
//             styles={buildStyles({
//               pathColor: ai.color,
//               trailColor: "#27272a",
//               textColor: "#e5e7eb",
//               filter: `drop-shadow(0 0 10px ${ai.color})`,
//             })}
//           />
//         </div>

//         <p className="text-sm font-semibold" style={{ color: ai.color }}>
//           {ai.status}
//         </p>

//         <p className="text-xs text-zinc-500">Click for details</p>
//       </div>
//     </div>
//   );
// }


function KpiCard({ label, value, unit, ai, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Glow */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition"
        style={{ backgroundColor: ai.color }}
      />

      <div className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800
                      rounded-2xl p-5 h-[260px]
                      flex flex-col items-center justify-between
                      transition hover:scale-[1.02]">
        
        {/* Title */}
        <p className="text-sm text-zinc-400">{label}</p>

        {/* Gauge */}
        <div className="w-24 h-24">
          <CircularProgressbar
            value={ai.percent}
            text={
              value !== undefined && value !== null
                ? `${value}${unit}`
                : "--"
            }
            styles={buildStyles({
              pathColor: ai.color,
              trailColor: "#27272a",
              textColor: "#e5e7eb",
              textSize: "18px",
              pathTransitionDuration: 0.6,
            })}
          />
        </div>

        {/* Status */}
        <div className="text-center space-y-1">
          <p
            className="text-sm font-semibold"
            style={{ color: ai.color }}
          >
            {ai.status}
          </p>
          <p className="text-[11px] text-zinc-500">
            Click for details
          </p>
        </div>
      </div>
    </div>
  );
}


