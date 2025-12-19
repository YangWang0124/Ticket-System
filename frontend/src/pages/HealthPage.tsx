import { useEffect, useState } from "react";

export default function HealthPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://ticket-system-pxg4.onrender.com/api/health")
      .then(res => {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>❌ Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading health check...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>✅ Health Check Page</h1>
      <p>Status: {data.status}</p>
      <p>Message: {data.message}</p>
      <p>Time: {data.time}</p>
    </div>
  );
}
