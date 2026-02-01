import { useState } from "react";
import { useUser } from "../hooks/useUser";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  User,
  Users2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  ShieldAlert,
  Hash,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentsList = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { listStudents } = useUser();

  const {
    data: studentsResponse,
    isLoading,
    isError,
    refetch,
  } = listStudents(page, limit);

  if (isLoading) {
    return <LoadingState message="Consultando el barchivo de estudiantes..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="No se pudo recuperar el listado de alumnos del servidor."
        onRetry={() => refetch()}
        title="Error de Conexión"
      />
    );
  }

  const meta = studentsResponse?.meta;
  const studentData = studentsResponse?.data || [];

  // TODO:  implemntar  la busqueda por nombre y dni

  return (
    <div className="bg-[#0d1627]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Table Search & Filter Bar (Placeholder for now) */}
      {/* <div className="p-6 border-b border-white/5 bg-white/2 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
          <input
            placeholder="Buscar por nombre o DNI..."
            className="h-12 w-full pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl outline-none"
          />
        </div>
      </div> */}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/1">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Estudiante
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Documento
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                Periodo Actual
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                Acceso
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {studentData.length > 0 ? (
              studentData.map((student) => {
                // Find current or latest enrollment
                const currentEnrollment =
                  student.enrollments.find((e) => e.period.isCurrent) ||
                  student.enrollments[0];

                return (
                  <tr
                    key={student.id}
                    className="group hover:bg-white/2 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20 group-hover:scale-110 transition-transform">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold tracking-tight text-lg leading-none mb-1">
                            {student.fullName}
                          </p>
                          <p className="text-slate-500 text-xs font-serif italic">
                            Estudiante de Pregrado
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400 font-mono text-xs bg-white/5 px-3 py-1.5 rounded-lg w-fit border border-white/5">
                        <Hash className="w-3.5 h-3.5 text-[#b59a5d]/60" />
                        {student.dni}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                        {currentEnrollment ? (
                          <>
                            <div className="flex items-center gap-1.5 text-[#b59a5d]">
                              <CalendarDays className="w-4 h-4" />
                              <span className="text-sm font-bold tracking-tight">
                                {currentEnrollment.period.name}
                              </span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">
                              Matrícula Activa
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-600 text-[10px] font-bold uppercase">
                            Sin Periodo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        {student.isActive ? (
                          <div className="flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] px-4 py-1.5 rounded-full border border-[#10b981]/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              Activo
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full border border-red-500/20">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              Baja
                            </span>
                          </div>
                        )}
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
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-white/5 text-slate-600">
                      <Users2 className="w-10 h-10" />
                    </div>
                    <p className="text-slate-500 font-serif italic text-lg">
                      No se han encontrado estudiantes registrados.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-white/5 bg-white/1 flex items-center justify-between">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Mostrando {studentData.length} de {meta?.total || 0} Entradas
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
  );
};

export default StudentsList;
