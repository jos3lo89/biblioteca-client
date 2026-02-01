import http from "@/config/axios";
import type { CreatedPeriodSchemaT } from "../schemas/period.schema";
import type {
  CreatedPeriodResponse,
  GetAllPeriodsResponse,
  SetCurrentPeriodResponse,
} from "../interfaces/period.interface";

export const periodService = {
  createPeriod: async (period: CreatedPeriodSchemaT) => {
    const { data } = await http.post<CreatedPeriodResponse>("/periods", period);
    return data;
  },
  getPeriods: async (page: number = 1, limit: number = 5) => {
    const { data } = await http.get<GetAllPeriodsResponse>("/periods", {
      params: {
        page,
        limit,
      },
    });
    return data;
  },

  setCurrentPeriod: async (id: string) => {
    const { data } = await http.patch<SetCurrentPeriodResponse>(
      `/periods/${id}/current`,
    );
    return data;
  },
};
