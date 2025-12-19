import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

export function getUserRole(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      null
    );
  } catch {
    return null;
  }
}
