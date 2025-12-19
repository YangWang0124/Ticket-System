import { useEffect, useState } from "react";
import { getTickets } from "../api/ticketApi";
import { getUserRole } from "../utils/jwt";
import styles from "./Tickets.module.css";

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const role = getUserRole();

  useEffect(() => {
    getTickets().then(res => setTickets(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {role === "Customer" ? "My Tickets" : "All Tickets"}
      </h2>

      <div className={styles.list}>
        {tickets.map(ticket => (
          <div key={ticket.id} className={styles.card}>
            <div className={styles.header}>
              <h3>{ticket.title}</h3>
              <span className={styles.status}>{ticket.status}</span>
            </div>

            {(role === "Agent" || role === "Admin") && (
              <button className={styles.actionBtn}>
                Update Status
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
