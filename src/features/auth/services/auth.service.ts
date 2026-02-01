import http from "@/config/axios";
import type {
  LoginData,
  LoginResponse,
  LogoutResponse,
} from "../interfaces/auth.interface";

export const authService = {
  login: async (values: LoginData) => {
    const { data } = await http.post<LoginResponse>("/auth/login", values);
    return data;
  },

  logout: async () => {
    const { data } = await http.post<LogoutResponse>("/auth/logout");
    return data;
  },
};
