import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  dni: z.string().min(3, "El DNI debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["STUDENT", "ADMIN"]),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

// {
//     "dni": "74843113",
//     "name": "jose luis",
//     "lastName": "galindo cardenas",
//     "password": "123456",
//     "role": "STUDENT"
// }
