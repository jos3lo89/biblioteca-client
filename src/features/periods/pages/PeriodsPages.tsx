import LoadingState from "@/components/common/LoadingState";
import { usePeriod } from "../hooks/usePeriod";
import ErrorState from "@/components/common/ErrorState";
import {
  Calendar,
  Clock,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  CalendarDays,
  Users,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreatePeriodDialog from "../components/CreatePeriodDialog";

/**
 * PeriodsPages - Administrative management of academic periods for the digital library.
 */
const PeriodsPages = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { listPeriods } = usePeriod();

  const {
    data: periods,
    isLoading,
    isError,
    refetch,
  } = listPeriods(page, limit);

  if (isLoading) {
    return <LoadingState message="Consultando el registro de periodos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="No se pudo recuperar el listado de periodos académicos."
        onRetry={() => refetch()}
        title="Error de Conexión"
      />
    );
  }

  const meta = periods?.meta;
  const periodData = periods?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Archivo de <span className="text-[#b59a5d]">Periodos</span>
          </h1>
          {/* <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
            Gestión y control de los ciclos académicos en el archivo.
          </p>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" /> */}
        </div>

        <CreatePeriodDialog />
      </div>

      {/* Table & Filtering */}
      <div className="bg-[#0d1627]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Scholarly Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/1">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Periodo
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Duración
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                  Estado
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                  Inscripciones
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {periodData.length > 0 ? (
                periodData.map((period) => (
                  <tr
                    key={period.id}
                    className="group hover:bg-white/2 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20 group-hover:scale-110 transition-transform">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold tracking-tight text-lg leading-none mb-1">
                            {period.name}
                          </p>
                          <p className="text-slate-500 text-xs font-serif italic">
                            Ciclo Académico
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Clock className="w-3.5 h-3.5 text-[#b59a5d]/60" />
                          <span>
                            {new Date(period.startDate).toLocaleDateString(
                              "es-PE",
                              {
                                timeZone: "UTC",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="text-slate-600">→</span>
                          <span>
                            {new Date(period.endDate).toLocaleDateString(
                              "es-PE",
                              {
                                timeZone: "UTC",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        {period.isCurrent ? (
                          <div className="flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] px-4 py-1.5 rounded-full border border-[#10b981]/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              Actual
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-slate-500/10 text-slate-500 px-4 py-1.5 rounded-full border border-white/5">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              Pasado
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-600" />
                          <span className="text-2xl font-black text-[#b59a5d] leading-none">
                            {period._count?.enrollments || 0}
                          </span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">
                          Inscritos
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-slate-500 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10 rounded-xl"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 rounded-full bg-white/5 text-slate-600">
                        <Calendar className="w-10 h-10" />
                      </div>
                      <p className="text-slate-500 font-serif italic text-lg">
                        No se han encontrado registros de periodos académicos.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination Footer */}
        <div className="p-6 border-t border-white/5 bg-white/1 flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            Mostrando {periodData.length} de {meta?.total || 0} Entradas
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={!meta?.hasPrev}
              onClick={() => setPage((p) => p - 1)}
              className="h-10 w-10 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center px-4 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-[#b59a5d]">
              {page} / {meta?.lastPage || 1}
            </div>
            <Button
              variant="ghost"
              size="icon"
              disabled={!meta?.hasNext}
              onClick={() => setPage((p) => p + 1)}
              className="h-10 w-10 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodsPages;
