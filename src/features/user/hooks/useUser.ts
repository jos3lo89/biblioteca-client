import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUser = () => {
  const queryClient = useQueryClient();

  const registerUser = useMutation({
    mutationKey: ["register-user"],
    mutationFn: userService.register,
    onSuccess: () => {
      toast.success("Usuario registrado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["list", "users", "admin"] });
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

  const listStudents = (
    page: number = 1,
    limit: number = 5,
    search?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "students", page, limit, search],
      queryFn: () => userService.listStudents(page, limit, search),
    });
  };

  const registerStudent = useMutation({
    mutationKey: ["register", "student"],
    mutationFn: userService.registerStudent,
    onSuccess: () => {
      toast.success("Estudiante registrado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["list", "students"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al registrar estudiante");
      }
    },
    onMutate: () => {
      toast.loading("Registrando estudiante...", {
        id: "register-student",
      });
    },
    onSettled: () => {
      toast.dismiss("register-student");
    },
  });

  const listUsersAdmin = (
    page: number = 1,
    limit: number = 5,
    search?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "users", "admin", page, limit, search],
      queryFn: () => userService.listUsersAdmin(page, limit, search),
    });
  };

  return {
    registerUser,
    listStudents,
    registerStudent,
    listUsersAdmin,
  };
};
