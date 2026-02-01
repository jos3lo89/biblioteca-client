import { useMutation } from "@tanstack/react-query";
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

  return {
    registerUser,
  };
};
