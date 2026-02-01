import { useState } from "react";
import { usePeriod } from "@/features/periods/hooks/usePeriod";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/common/LoadingState";

interface PeriodSelectorProps {
  selectedPeriodId?: string;
  onSelect: (periodId: string, periodName: string) => void;
}

const PeriodSelector = ({
  selectedPeriodId,
  onSelect,
}: PeriodSelectorProps) => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { listPeriods } = usePeriod();

  const {
    data: periodsResponse,
    isLoading,
    isError,
  } = listPeriods(page, limit);

  if (isLoading)
    return (
      <div className="h-40 flex items-center justify-center">
        <LoadingState message="Buscando periodos..." />
      </div>
    );
  if (isError)
    return (
      <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-center">
        Error al cargar periodos
      </div>
    );

  const periods = periodsResponse?.data || [];
  const meta = periodsResponse?.meta;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {periods.map((period) => (
          <div
            key={period.id}
            onClick={() => onSelect(period.id, period.name)}
            className={`
              relative p-4 rounded-2xl border transition-all cursor-pointer group
              ${
                selectedPeriodId === period.id
                  ? "bg-[#b59a5d]/20 border-[#b59a5d] shadow-[0_0_20px_rgba(181,154,93,0.2)]"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar
                  className={`w-4 h-4 ${selectedPeriodId === period.id ? "text-[#b59a5d]" : "text-slate-500"}`}
                />
                <span className="text-white font-bold tracking-tight">
                  {period.name}
                </span>
              </div>
              {selectedPeriodId === period.id && (
                <CheckCircle2 className="w-5 h-5 text-[#b59a5d] animate-in zoom-in duration-300" />
              )}
              {period.isCurrent && !selectedPeriodId && (
                <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">
                  Actual
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(period.startDate).toLocaleDateString("es-PE", {
                  timeZone: "UTC",
                })}
                {" - "}
                {new Date(period.endDate).toLocaleDateString("es-PE", {
                  timeZone: "UTC",
                })}
              </span>
            </div>

            {selectedPeriodId === period.id && (
              <div className="absolute inset-0 border-2 border-[#b59a5d] rounded-2xl pointer-events-none" />
            )}
          </div>
        ))}

        {periods.length === 0 && (
          <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-slate-500 font-serif italic">
              No hay periodos disponibles para el archivo.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {meta && meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!meta.hasPrev}
            onClick={() => setPage((p) => p - 1)}
            className="h-8 w-8 rounded-lg border border-white/5 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3">
            Página {page} de {meta.lastPage}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!meta.hasNext}
            onClick={() => setPage((p) => p + 1)}
            className="h-8 w-8 rounded-lg border border-white/5 text-slate-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PeriodSelector;
