import http from "@/config/axios";
import type { RegisterUserDto } from "../schemas/user.schema";
import type { RegisterUserResponse } from "../interfaces/user.interface";

export const userService = {
  register: async (userData: RegisterUserDto) => {
    const { data } = await http.post<RegisterUserResponse>(
      "/auth/register",
      userData,
    );
    return data;
  },
};
