import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { setUser } = useAuthStore();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser({
        dni: data.dni,
        id: data.id,
        lastName: data.lastName,
        name: data.fullName,
        role: data.role,
      });
    },
    onError: (error) => {
      toast.error("Error al iniciar sesión");
      console.error(error);
    },
    onMutate: () => {
      toast.loading("Iniciando sesión", { id: "login" });
    },
    onSettled: () => {
      toast.dismiss("login");
    },
  });

  return {
    login,
  };
};
