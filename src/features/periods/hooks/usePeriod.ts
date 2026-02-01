import { useMutation, useQuery } from "@tanstack/react-query";
import { periodService } from "../services/period.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const usePeriod = () => {
  const created = useMutation({
    mutationKey: ["period"],
    mutationFn: periodService.createPeriod,
    onSuccess: () => {
      toast.success("Periodo creado con exito");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear el periodo");
      }
    },
    onMutate: () => {
      toast.loading("Creando periodo...", { id: "create-period" });
    },
    onSettled: () => {
      toast.dismiss("create-period");
    },
  });

  const listPeriods = (page: number = 1, limit: number = 5) => {
    return useQuery({
      queryKey: ["list", "period", page, limit],
      queryFn: () => periodService.getPeriods(page, limit),
    });
  };

  return {
    createPeriod: created,
    listPeriods,
  };
};
