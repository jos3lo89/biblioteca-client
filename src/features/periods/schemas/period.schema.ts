import z from "zod";

export const createdPeriodSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean(),
});

export type CreatedPeriodSchemaT = z.infer<typeof createdPeriodSchema>;
