import { Link } from "react-router-dom";
import { getUserRole } from "../utils/jwt";

export default function Navbar() {
  const role = getUserRole();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/tickets" style={styles.link}>
          Tickets
        </Link>

        {role === "Customer" && (
          <Link to="/create" style={styles.link}>
            Create Ticket
          </Link>
        )}

        {(role === "Agent" || role === "Admin") && (
          <span style={styles.badge}>Agent Dashboard</span>
        )}
      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #333",
  },
  left: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#60a5fa",
    fontWeight: 500,
  },
  badge: {
    fontSize: "14px",
    color: "#a78bfa",
    fontWeight: 600,
  },
  logout: {
    background: "transparent",
    border: "1px solid #555",
    color: "#e5e7eb",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
