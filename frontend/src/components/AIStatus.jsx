// import { useEffect, useState } from "react";
// import { getAIInsights } from "../api/api";

// export default function AIStatus() {
//   const [ai, setAI] = useState(null);

//   useEffect(() => {
//     getAIInsights().then(res => setAI(res.data));
//   }, []);

//   if (!ai) return <p>Loading AI...</p>;

//   return (
//     <div style={card}>
//       <h2>🧠 AI Status</h2>
//       <p>Health Score: {ai.health_score}</p>
//       <p>Status: {ai.health_status}</p>
//       <p>BSF Stage: {ai.bsf_stage}</p>

//       <ul>
//         {ai.health_reasons.map((r, i) => (
//           <li key={i}>{r}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// const card = {
//   padding: "20px",
//   borderRadius: "10px",
//   background: "#222",
//   color: "#fff",
// };


import { useEffect, useState } from "react";
import { getLatestHealth } from "../api/api";

export default function AIStatus() {
  const [text, setText] = useState("AI analyzing conditions…");

  useEffect(() => {
    async function fetchAI() {
      const res = await getLatestHealth();
      const { health_score, insights } = res.data;

      if (health_score >= 80) {
        setText("AI predicts stable and healthy BSF growth");
      } else if (health_score >= 60) {
        setText(`AI notes mild stress: ${insights?.[0] || "monitor conditions"}`);
      } else {
        setText(`⚠️ AI warning: ${insights?.[0] || "critical conditions"}`);
      }
    }

    fetchAI();
  }, []);

  return (
    <span className="text-green-400 font-medium">
      {text}
    </span>
  );
}
