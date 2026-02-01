import type { UserRole } from "@/common/types/user-role";

export interface LoginData {
  dni: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
