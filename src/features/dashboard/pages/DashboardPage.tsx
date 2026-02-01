import { Users, Library, GraduationCap, Calendar, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "../hooks/useDashboard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

/**
 * DashboardPage - Analytical overview of the library system with real-time data.
 */
const DashboardPage = () => {
  const { getStats } = useDashboard();
  const { data: stats, isLoading, isError, refetch } = getStats;

  if (isLoading) {
    return (
      <LoadingState message="Sincronizando métricas con el núcleo del sistema..." />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Fallo de Sincronización"
        message="No se pudieron recuperar las analíticas del servidor central."
        onRetry={() => refetch()}
      />
    );
  }

  const mainStats = [
    {
      label: "Total Estudiantes",
      value: stats?.users.students || 0,
      icon: Users,
      color: "#b59a5d",
    },
    {
      label: "Libros en Acervo",
      value: stats?.books.total || 0,
      icon: Library,
      color: "#b59a5d",
    },
    {
      label: "Periodos Registrados",
      value: stats?.periods.total || 0,
      icon: Calendar,
      color: "#b59a5d",
    },
    {
      label: "Categorías",
      value: stats?.categories.total || 0,
      icon: Hash,
      color: "#b59a5d",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Panel de <span className="text-[#b59a5d]">Control</span>
          </h1>

          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>

        {stats?.periods.current && (
          <div className="bg-[#b59a5d]/10 border border-[#b59a5d]/20 px-6 py-4 rounded-[2rem] backdrop-blur-xl flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
              Ciclo Activo
            </span>
            <div className="flex items-center gap-3">
              <span className="text-white font-black text-xl">
                {stats.periods.current.name}
              </span>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-1.5 text-[#b59a5d]">
                <GraduationCap className="w-5 h-5" />
                <span className="font-bold">
                  {stats.periods.current.enrollmentsCount}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-[#0b1120] border-white/5 hover:border-[#b59a5d]/30 transition-all duration-500 group overflow-hidden relative"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-400 transition-colors">
                {stat.label}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-[#b59a5d]/60 group-hover:text-[#b59a5d] transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="flex items-center mt-2 text-[9px] font-black uppercase tracking-widest text-[#b59a5d]/60">
                Sincronizado
              </div>
            </CardContent>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#b59a5d]/5 blur-3xl rounded-full" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
