import { useEffect, useState } from "react";
import { getTickets } from "../api/ticketApi";

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    getTickets().then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map(t => (
        <div key={t.id}>
          <strong>{t.title}</strong> — {t.status}
        </div>
      ))}
    </div>
  );
}
