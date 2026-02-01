import LoadingState from "@/components/common/LoadingState";
import { usePeriod } from "../hooks/usePeriod";
import ErrorState from "@/components/common/ErrorState";

const PeriodsPages = () => {
  const { listPeriods } = usePeriod();

  const { data: periods, isLoading, isError, refetch } = listPeriods();

  if (isLoading) {
    return <LoadingState message="Cargando periodos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Error al cargar periodos"
        title="Error"
        onRetry={() => refetch()}
      />
    );
  }

  console.log("data: ", periods?.data);
  console.log("meta: ", periods?.meta);

  return <div>PeriodsPages</div>;
};
export default PeriodsPages;
