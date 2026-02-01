import http from "@/config/axios";
import type { CategoryDto } from "../schemas/category.schema";
import type {
  CreateCategoryResponse,
  GetAllCategoriesResponse,
  GetCategoriesResponse,
} from "../interfaces/category.interface";

export const categoryService = {
  createCategory: async (category: CategoryDto) => {
    const { data } = await http.post<CreateCategoryResponse>(
      "/categories",
      category,
    );
    return data;
  },

  getCategories: async (page: number, limit: number, search?: string) => {
    const { data } = await http.get<GetCategoriesResponse>("/categories", {
      params: {
        page,
        limit,
        search: search || "",
      },
    });
    return data;
  },

  getAllCategories: async () => {
    const { data } =
      await http.get<GetAllCategoriesResponse[]>("/categories/all");
    return data;
  },
};
