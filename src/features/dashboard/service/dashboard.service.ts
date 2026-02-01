import http from "@/config/axios";
import type { DashboardStatsResponse } from "../interfaces/dashboard.interface";

export const dashboardService = {
  getStats: async () => {
    const response = await http.get<DashboardStatsResponse>("/dashboard/stats");
    return response.data;
  },
};
