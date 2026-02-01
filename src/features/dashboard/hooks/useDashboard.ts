import { dashboardService } from "../service/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  const getStats = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardService.getStats,
  });

  return {
    getStats,
  };
};
