// import { useEffect, useState } from "react";
// import { getBSFStatus } from "../api/api";

// const STAGE_COLORS = {
//   Egg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//   Larva: "bg-green-500/20 text-green-400 border-green-500/30",
//   Pupa: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//   Adult: "bg-purple-500/20 text-purple-400 border-purple-500/30",
// };

// export default function BSFStage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   async function fetchStatus() {
//     try {
//       const res = await getBSFStatus();
//       setData(res.data);
//       setError(false);
//     } catch (err) {
//       console.error("❌ BSF status error:", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchStatus();
//     const interval = setInterval(fetchStatus, 30000); // auto refresh
//     return () => clearInterval(interval);
//   }, []);

//   /* ================= STATES ================= */

//   if (loading) {
//     return (
//       <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse">
//         <p className="text-zinc-400 text-sm">Loading BSF lifecycle…</p>
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="bg-zinc-900 border border-red-500/30 rounded-xl p-4">
//         <p className="text-red-400 text-sm">BSF lifecycle data unavailable</p>
//       </div>
//     );
//   }

//   /* ================= LOGIC ================= */

//   const totalCycleDays = 20; // configurable later
//   const progress = Math.min(
//     100,
//     Math.round((data.age_days / totalCycleDays) * 100)
//   );

//   const nextStage =
//     data.stage === "Egg"
//       ? "Larva"
//       : data.stage === "Larva"
//       ? "Pupa"
//       : data.stage === "Pupa"
//       ? "Adult"
//       : "Completed";

//   const badgeStyle =
//     STAGE_COLORS[data.stage] ??
//     "bg-zinc-700 text-zinc-300 border-zinc-600";

//   /* ================= UI ================= */

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">

//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
//           🪱 BSF Lifecycle
//         </h2>

//         <span
//           className={`px-3 py-1 text-xs rounded-full border ${badgeStyle}`}
//         >
//           {data.stage}
//         </span>
//       </div>
        
//       {/* DETAILS */}
//       <div className="space-y-2 text-sm text-zinc-300">
//         <p>
//           <span className="text-zinc-400">Age:</span>{" "}
//           <span className="font-medium">{data.age_days} days</span>
//         </p>

//         <p>
//           <span className="text-zinc-400">Harvest:</span>{" "}
//           <span className="text-green-400">
//             {data.harvest_prediction}
//           </span>
//         </p>

//         <p>
//           <span className="text-zinc-400">Next stage:</span>{" "}
//           <span className="text-yellow-400">{nextStage}</span>
//         </p>
//       </div>

//       {/* PROGRESS BAR */}
//       <div className="space-y-1">
//         <div className="flex justify-between text-xs text-zinc-400">
//           <span>Growth progress</span>
//           <span>{progress}%</span>
//         </div>

//         <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* AI INSIGHT */}
//       <div className="text-xs text-zinc-400 italic">
//         🤖 AI Insight: Growth is{" "}
//         <span className="text-green-400 font-medium">
//           {progress > 60 ? "on track" : "developing"}
//         </span>{" "}
//         under current conditions.
//       </div>

//       {/* FOOTER */}
//       {data.started_on && (
//         <div className="text-[11px] text-zinc-500">
//           Started on{" "}
//           {new Date(data.started_on).toLocaleString("en-IN", {
//             timeZone: "Asia/Kolkata",
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getBSFStatus, resetBSFCycle } from "../api/api";

// /* ================= CONFIG ================= */

// const STAGES = [
//   { name: "Egg", days: 3 },
//   { name: "Larva", days: 14 },
//   { name: "Pupa", days: 3 },
// ];

// const TOTAL_DAYS = STAGES.reduce((a, b) => a + b.days, 0);
// const [selectedDate, setSelectedDate] = useState("");

// const STAGE_COLORS = {
//   Egg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//   Larva: "bg-green-500/20 text-green-400 border-green-500/30",
//   Pupa: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//   Adult: "bg-purple-500/20 text-purple-400 border-purple-500/30",
// };

// /* ================= COMPONENT ================= */

// export default function BSFStage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchStatus() {
//     const res = await getBSFStatus();
//     setData(res.data);
//     setLoading(false);
//   }

//  async function handleReset() {
//   await resetBSFCycle(
//     "BSF_001",
//     selectedDate ? new Date(selectedDate).toISOString() : null
//   );
//   setSelectedDate("");
//   fetchStatus();
// }

//   useEffect(() => {
//     fetchStatus();
//     const i = setInterval(fetchStatus, 30000);
//     return () => clearInterval(i);
//   }, []);

//   if (loading || !data) {
//     return (
//       <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse">
//         Loading BSF lifecycle…
//       </div>
//     );
//   }

//   /* ================= CALCULATIONS ================= */

//   const start = new Date(data.started_on);
//   const now = new Date();
//   const ageDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

//   let cumulative = 0;
//   let currentStage = "Completed";
//   let dayInStage = 0;

//   for (const stage of STAGES) {
//     if (ageDays < cumulative + stage.days) {
//       currentStage = stage.name;
//       dayInStage = ageDays - cumulative + 1;
//       break;
//     }
//     cumulative += stage.days;
//   }

//   const progress = Math.min(100, Math.round((ageDays / TOTAL_DAYS) * 100));
//   const remaining = Math.max(0, TOTAL_DAYS - ageDays);

//   const badgeStyle =
//     STAGE_COLORS[currentStage] ??
//     "bg-zinc-700 text-zinc-300 border-zinc-600";

//   /* ================= UI ================= */

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-sm font-semibold text-zinc-200">
//           🪱 BSF Lifecycle
//         </h2>

//         <span className={`px-3 py-1 text-xs rounded-full border ${badgeStyle}`}>
//           {currentStage}
//         </span>
//       </div>

//       {/* DETAILS */}
//       <div className="grid grid-cols-2 gap-3 text-sm">
//         <div>
//           <p className="text-zinc-400">Age</p>
//           <p className="font-medium">{ageDays} days</p>
//         </div>

//         <div>
//           <p className="text-zinc-400">Harvest</p>
//           <p className="text-green-400">{remaining} days remaining</p>
//         </div>

//         <div>
//           <p className="text-zinc-400">Stage day</p>
//           <p className="text-yellow-400">
//             Day {dayInStage} of {currentStage}
//           </p>
//         </div>

//         <div>
//           <p className="text-zinc-400">Progress</p>
//           <p>{progress}%</p>
//         </div>
//       </div>

//       {/* PROGRESS BAR */}
//       <div>
//         <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* AI INSIGHT */}
//       <div className="text-xs italic text-zinc-400">
//         🤖 AI Insight:{" "}
//         <span className="text-green-400 font-medium">
//           {currentStage === "Egg" && "Early development phase"}
//           {currentStage === "Larva" && "Rapid growth ongoing"}
//           {currentStage === "Pupa" && "Transformation stage"}
//           {currentStage === "Completed" && "Cycle complete — ready to harvest"}
//         </span>
//       </div>

//       {/* DATE SELECT */}
// <div className="space-y-1">
//   <label className="text-xs text-zinc-400">
//     Select batch start date
//   </label>

//   <input
//     type="date"
//     value={selectedDate}
//     onChange={(e) => setSelectedDate(e.target.value)}
//     className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-sm text-zinc-200"
//   />
// </div>


//       {/* FOOTER */}
//       <div className="flex justify-between items-center text-[11px] text-zinc-500">
//         <span>
//           Auto-updated every 30s
//         </span>

//         {progress >= 100 && (
//   <button
//     onClick={handleReset}
//     className="text-red-400 hover:text-red-300 text-xs"
//   >
//     Reset Batch
//   </button>
// )}

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getBSFStatus, resetBSFCycle } from "../api/api";

/* ================= CONFIG ================= */

const STAGES = [
  { name: "Egg", days: 3 },
  { name: "Larva", days: 14 },
  { name: "Pupa", days: 3 },
];

const TOTAL_DAYS = STAGES.reduce((a, b) => a + b.days, 0);

const STAGE_COLORS = {
  Egg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Larva: "bg-green-500/20 text-green-400 border-green-500/30",
  Pupa: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Completed: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

/* ================= COMPONENT ================= */

export default function BSFStage() {
  /* ✅ ALL HOOKS AT TOP LEVEL */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  /* ================= API ================= */

  const fetchStatus = async () => {
    try {
      const res = await getBSFStatus();
      setData(res.data);
    } catch (err) {
      console.error("BSF status error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    await resetBSFCycle(
      "BSF_001",
      selectedDate ? new Date(selectedDate).toISOString() : null
    );
    setSelectedDate("");
    fetchStatus();
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ================= UI STATES ================= */

  if (loading || !data) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse">
        Loading BSF lifecycle…
      </div>
    );
  }

  /* ================= LOGIC ================= */

  const start = new Date(data.started_on);
  const now = new Date();
  const ageDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  let cumulative = 0;
  let currentStage = "Completed";
  let dayInStage = 0;

  for (const stage of STAGES) {
    if (ageDays < cumulative + stage.days) {
      currentStage = stage.name;
      dayInStage = ageDays - cumulative + 1;
      break;
    }
    cumulative += stage.days;
  }

  const progress = Math.min(
    100,
    Math.round((ageDays / TOTAL_DAYS) * 100)
  );

  const remaining = Math.max(0, TOTAL_DAYS - ageDays);

  const badgeStyle =
    STAGE_COLORS[currentStage] ??
    "bg-zinc-700 text-zinc-300 border-zinc-600";

  /* ================= UI ================= */

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-zinc-200">
          🪱 BSF Lifecycle
        </h2>

        <span className={`px-3 py-1 text-xs rounded-full border ${badgeStyle}`}>
          {currentStage}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-zinc-400">Age</p>
          <p>{ageDays} days</p>
        </div>

        <div>
          <p className="text-zinc-400">Harvest</p>
          <p className="text-green-400">
            {remaining} days remaining
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Stage day</p>
          <p className="text-yellow-400">
            Day {dayInStage} of {currentStage}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Progress</p>
          <p>{progress}%</p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* DATE PICKER */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">
          Select batch start date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-sm text-zinc-200"
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center text-xs text-zinc-500">
        <span>Auto-refresh every 30s</span>

        
          <button
            onClick={handleReset}
            className="text-red-400 hover:text-red-300"
          >
            Reset Batch
          </button>
        
      </div>
    </div>
  );
}
