import z from "zod";

export const createdPeriodSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  startDate: z.date().min(1, "La fecha de inicio es requerida"),
  endDate: z.date().min(1, "La fecha de fin es requerida"),
  isCurrent: z.boolean(),
});

export type CreatedPeriodSchemaT = z.infer<typeof createdPeriodSchema>;
