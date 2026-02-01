import { z } from "zod";

export const loginSchema = z.object({
  dni: z.string().min(1, "El DNI es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginSchemaT = z.infer<typeof loginSchema>;
