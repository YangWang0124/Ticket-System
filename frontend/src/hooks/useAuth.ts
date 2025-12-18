import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
};
