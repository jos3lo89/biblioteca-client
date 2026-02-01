import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  author: z.string().min(1, "El autor es obligatorio"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es obligatoria"),
  isDownloadable: z.boolean(),
  cover: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (file instanceof FileList && file.length > 0),
      "La portada es obligatoria",
    ),
  file: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (file instanceof FileList && file.length > 0),
      "El archivo PDF es obligatorio",
    ),
});

export type BookDto = z.infer<typeof bookSchema>;
