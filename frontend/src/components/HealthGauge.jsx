// import { useEffect, useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { getHealthHistory } from "../api/api";

// export default function HealthGauge() {
//   const [score, setScore] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchHealth() {
//     try {
//       const res = await getHealthHistory();
//       if (res.data?.length) {
//         setScore(res.data[res.data.length - 1].health_score);
//       }
//     } catch (err) {
//       console.error("❌ Health fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchHealth();
//     const interval = setInterval(fetchHealth, 5000); // live refresh
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">
//         <p className="text-zinc-400 text-sm text-center">
//           Analyzing environment…
//         </p>
//       </div>
//     );
//   }

//   if (score === null) {
//     return (
//       <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-5">
//         <p className="text-red-400 text-sm text-center">
//           Health data unavailable
//         </p>
//       </div>
//     );
//   }

//   /* ================= LOGIC ================= */

//   const status =
//     score >= 80 ? "Excellent" : score >= 60 ? "Good" : "At Risk";

//   const color =
//     score >= 80 ? "#22c55e" : score >= 60 ? "#facc15" : "#ef4444";

//   const glow =
//     score >= 80
//       ? "shadow-green-500/30"
//       : score >= 60
//       ? "shadow-yellow-500/30"
//       : "shadow-red-500/30";

//   const reason =
//     score >= 80
//       ? "Optimal conditions for BSF growth"
//       : score >= 60
//       ? "Minor environmental instability detected"
//       : "Unfavorable conditions — action recommended";

//   /* ================= UI ================= */

//   return (
//     <div
//       className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-xs mx-auto shadow-xl ${glow}`}
//     >
//       {/* HEADER */}
//       <div className="text-center mb-4">
//         <h3 className="text-sm uppercase tracking-widest text-zinc-400">
//           BIOPOD Health
//         </h3>
//       </div>

//       {/* GAUGE */}
//       <div className="relative w-44 h-44 mx-auto">
//         {/* Glow ring */}
//         <div
//           className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
//           style={{ backgroundColor: color }}
//         />

//         <CircularProgressbar
//           value={score}
//           text={`${score}`}
//           styles={buildStyles({
//             pathColor: color,
//             textColor: "#e5e7eb",
//             trailColor: "#27272a",
//             textSize: "22px",
//             pathTransitionDuration: 0.6,
//           })}
//         />
//       </div>

//       {/* STATUS */}
//       <div className="mt-4 text-center space-y-1">
//         <p
//           className="text-sm font-semibold"
//           style={{ color }}
//         >
//           {status}
//         </p>
//         <p className="text-xs text-zinc-400">
//           {reason}
//         </p>
//       </div>

//       {/* LIVE INDICATOR */}
//       <div className="mt-3 flex justify-center items-center gap-2 text-xs text-zinc-500">
//         <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
//         Live AI Monitoring
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getLatestHealth } from "../api/api";

export default function HealthGauge() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchHealth() {
    try {
      const res = await getLatestHealth();
      setData(res.data);
    } catch (err) {
      console.error("❌ Health fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">
        <p className="text-zinc-400 text-sm text-center">
          Analyzing environment…
        </p>
      </div>
    );
  }

  if (!data || data.health_score == null) {
    return (
      <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-5">
        <p className="text-red-400 text-sm text-center">
          Health data unavailable
        </p>
      </div>
    );
  }

  const score = data.health_score;

  const status =
    score >= 80 ? "Excellent" : score >= 60 ? "Moderate" : "At Risk";

  const color =
    score >= 80 ? "#22c55e" : score >= 60 ? "#facc15" : "#ef4444";

  const glow =
    score >= 80
      ? "shadow-green-500/30"
      : score >= 60
      ? "shadow-yellow-500/30"
      : "shadow-red-500/30";

  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-xs mx-auto shadow-xl ${glow}`}
    >
      <div className="text-center mb-4">
        <h3 className="text-sm uppercase tracking-widest text-zinc-400">
          BIOPOD Health
        </h3>
      </div>

      <div className="relative w-44 h-44 mx-auto">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
          style={{ backgroundColor: color }}
        />

        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#e5e7eb",
            trailColor: "#27272a",
            textSize: "22px",
          })}
        />
      </div>

      <div className="mt-4 text-center space-y-1">
        <p className="text-sm font-semibold" style={{ color }}>
          {status}
        </p>

        {data.predicted_delay_days > 0 && (
          <p className="text-xs text-yellow-400">
            ⏳ Harvest may delay by ~{data.predicted_delay_days} day(s)
          </p>
        )}
      </div>

      {/* 🔥 AI INSIGHTS */}
      {data.insights?.length > 0 && (
        <ul className="mt-3 text-xs text-zinc-400 space-y-1">
          {data.insights.map((i, idx) => (
            <li key={idx}>⚠️ {i}</li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex justify-center items-center gap-2 text-xs text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
        Live AI Monitoring
      </div>
    </div>
  );
}
