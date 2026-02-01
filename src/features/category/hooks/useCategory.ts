import { useMutation } from "@tanstack/react-query";
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

  return {
    createCategory,
  };
};
