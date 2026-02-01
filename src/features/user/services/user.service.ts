import http from "@/config/axios";
import type {
  RegisterStudentDto,
  RegisterUserDto,
} from "../schemas/user.schema";
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

  listStudents: async (page: number, limit: number, search?: string) => {
    const { data } = await http.get<ListStudentsResponse>("/users/students", {
      params: {
        page,
        limit,
        search: search || "",
      },
    });
    return data;
  },

  registerStudent: async (userData: RegisterStudentDto) => {
    const { data } = await http.post<RegisterUserResponse>(
      "/users/students/register",
      userData,
    );
    return data;
  },
};
