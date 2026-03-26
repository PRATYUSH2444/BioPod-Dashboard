import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function useSensorData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API}/sensors/latest`);
      setData(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // live refresh

    return () => clearInterval(interval);
  }, []);

  return data;
}
