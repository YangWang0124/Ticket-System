import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/jwt";

type Props = {
    children: React.ReactNode;
  allowedRoles: string[];
};

export default function RoleRoute({ children, allowedRoles }: Props) {
  const role = getUserRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/tickets" replace />;
  }

  return children;
}
