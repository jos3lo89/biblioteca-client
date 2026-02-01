import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setUser, logout: logoutStore } = useAuthStore();
  const navigate = useNavigate();

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
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al iniciar sesión");
      }
    },
    onMutate: () => {
      toast.loading("Iniciando sesión", { id: "login" });
    },
    onSettled: () => {
      toast.dismiss("login");
    },
  });

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutStore();
      navigate("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al cerrar sesión");
      }
    },
    onMutate: () => {
      toast.loading("Cerrando sesión", { id: "logout" });
    },
    onSettled: () => {
      toast.dismiss("logout");
    },
  });

  return {
    login,
    logout,
  };
};
