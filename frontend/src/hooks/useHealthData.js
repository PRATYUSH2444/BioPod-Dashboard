import { useEffect, useState } from "react";
import { getHealthHistory } from "../api/api";

export default function useHealthData() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await getHealthHistory();
        if (res.data.length > 0) {
          setHealth(res.data[res.data.length - 1].health_score);
        }
      } catch (err) {
        console.error("Health fetch failed", err);
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return health;
}
