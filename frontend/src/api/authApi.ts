import { api } from "./client";

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => api.post("/api/auth/register", data);

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/login", data);
  localStorage.setItem("token", res.data.token);
};
