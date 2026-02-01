import http from "@/config/axios";
import type { CategoryDto } from "../schemas/category.schema";
import type { CreateCategoryResponse } from "../interfaces/category.interface";

export const categoryService = {
  createCategory: async (category: CategoryDto) => {
    const { data } = await http.post<CreateCategoryResponse>(
      "/categories",
      category,
    );
    return data;
  },
};
