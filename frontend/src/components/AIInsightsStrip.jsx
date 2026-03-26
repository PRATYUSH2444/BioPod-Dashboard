import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/ai/insights";

export default function AIInsightsStrip() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get(API_URL);
        setInsights(res.data);
      } catch (err) {
        console.error("Failed to fetch AI insights", err);
      }
    };

    fetchInsights();
    const interval = setInterval(fetchInsights, 6000); // live refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-y border-zinc-700 h-10 flex items-center">
      
      {/* LEFT LABEL */}
      <div className="absolute left-0 z-10 bg-red-600 text-white px-3 h-full flex items-center text-xs font-bold tracking-wider">
        LIVE AI
      </div>

      {/* SCROLLING TEXT */}
      <div className="ml-20 whitespace-nowrap animate-marquee flex gap-12 text-sm font-medium tracking-wide">
        {insights.map((item, index) => (
          <span
            key={index}
            className={`${
              item.level === "danger"
                ? "text-red-400"
                : item.level === "warning"
                ? "text-yellow-400"
                : item.level === "good"
                ? "text-green-400"
                : "text-blue-400"
            }`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
