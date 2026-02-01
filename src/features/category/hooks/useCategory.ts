import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";
import { toast } from "sonner";

export const useCategory = () => {
  const createCategory = useMutation({
    mutationKey: ["categories"],
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      toast.success("Categoría creada exitosamente");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al crear la categoría");
      }
    },
    onMutate: () => {
      toast.loading("Creando categoría...", { id: "create-category" });
    },
    onSettled: () => {
      toast.dismiss("create-category");
    },
  });

  const getAllCategories = useQuery({
    queryKey: ["list", "categories"],
    queryFn: categoryService.getAllCategories,
  });

  const getCategories = (
    page: number = 1,
    limit: number = 5,
    search?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "categories", page, limit, search],
      queryFn: () => categoryService.getCategories(page, limit, search),
    });
  };

  return {
    createCategory,
    getCategories,
    getAllCategories,
  };
};
