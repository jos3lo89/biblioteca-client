import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUser = () => {
  const registerUser = useMutation({
    mutationKey: ["register-user"],
    mutationFn: userService.register,
    onSuccess: () => {
      toast.success("Usuario registrado exitosamente");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al registrar usuario");
      }
    },
    onMutate: () => {
      toast.loading("Registrando usuario...", {
        id: "register-user",
      });
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const listStudents = (page: number = 1, limit: number = 5) => {
    return useQuery({
      queryKey: ["list", "students", page, limit],
      queryFn: () => userService.listStudents(page, limit),
    });
  };
  return {
    registerUser,
    listStudents,
  };
};
