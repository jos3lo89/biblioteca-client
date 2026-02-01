import http from "@/config/axios";
import type { RegisterUserDto } from "../schemas/user.schema";
import type {
  ListStudentsResponse,
  RegisterUserResponse,
} from "../interfaces/user.interface";

export const userService = {
  register: async (userData: RegisterUserDto) => {
    const { data } = await http.post<RegisterUserResponse>(
      "/auth/register",
      userData,
    );
    return data;
  },

  listStudents: async (page: number, limit: number) => {
    const { data } = await http.get<ListStudentsResponse>("/users/students", {
      params: {
        page,
        limit,
      },
    });
    return data;
  },
};
