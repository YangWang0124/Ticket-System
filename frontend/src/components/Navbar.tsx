import { Link, useLocation } from "react-router-dom";
import { getUserRole } from "../utils/jwt";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const role = getUserRole();
  const location = useLocation();

  // Hide navbar on login page
  if (location.pathname === "/login") return null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/tickets" className={styles.link}>
          Tickets
        </Link>

        {role === "Customer" && (
          <Link to="/create" className={styles.link}>
            Create Ticket
          </Link>
        )}

        {(role === "Agent" || role === "Admin") && (
          <span className={styles.roleBadge}>Agent Dashboard</span>
        )}
      </div>

      <button onClick={logout} className={styles.logout}>
        Logout
      </button>
    </nav>
  );
}
