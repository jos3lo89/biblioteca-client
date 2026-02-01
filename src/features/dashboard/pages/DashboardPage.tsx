import {
  Users,
  History,
  Library,
  GraduationCap,
  Calendar,
  Star,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Hash,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "../hooks/useDashboard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

  // Data for Category Chart
  const chartData =
    stats?.categories.withBooks.map((cat) => ({
      name: cat.name,
      books: cat.booksCount,
    })) || [];

  const COLORS = ["#b59a5d", "#c6a96e", "#d7b87f", "#e8c790", "#f9d6a1"];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Panel de <span className="text-[#b59a5d]">Control</span>
          </h1>
          {/* <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
            "Supervise el flujo de conocimiento y la integridad de los registros
            académicos."
          </p> */}
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

      <div className="grid xl:grid-cols-3 gap-8">
        {/* Main Chart Column */}
        <Card className="xl:col-span-2 bg-[#0d1627]/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
                <Library className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Distribución por Categorías
                </h3>
                <p className="text-xs text-slate-500 font-serif italic">
                  Relación de ejemplares registrados por asignatura.
                </p>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b59a5d" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#b59a5d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff05"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b1120",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#b59a5d" }}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="books" radius={[8, 8, 0, 0]} barSize={40}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fillOpacity={1}
                      fill="url(#barGradient)"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sidebar Column: Recent Activity & Engagement */}
        <div className="space-y-8">
          <Card className="bg-[#0b1120] border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-[#b59a5d]" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Matrículas Recientes
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>

            <div className="space-y-6">
              {stats?.enrollments.recent.length ? (
                stats.enrollments.recent.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-start gap-4 group"
                  >
                    <div className="relative mt-1">
                      {enrollment.canAccess ? (
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-bold text-white leading-none capitalize group-hover:text-[#b59a5d] transition-colors">
                        {enrollment.student.toLowerCase()}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          {enrollment.period}
                        </p>
                        <p className="text-[9px] font-medium text-slate-600 uppercase">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-slate-600 italic font-serif">
                  No hay actividad reciente.
                </div>
              )}
            </div>

            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#b59a5d]/3 blur-3xl rounded-full" />
          </Card>

          <Card className="bg-linear-to-br from-[#1e293b] to-[#0b1120] border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 text-[#b59a5d] fill-[#b59a5d]" />
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">
                Impacto Académico
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Calificación Promedio
                  </p>
                  <div className="text-4xl font-black text-[#b59a5d] tracking-tighter">
                    {stats?.engagement.averageRating.toFixed(1) || "0.0"}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Reseñas Totales
                  </p>
                  <div className="text-xl font-bold text-white">
                    {stats?.engagement.totalReviews || 0}
                  </div>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#b59a5d] to-[#c6a96e] rounded-full"
                  style={{
                    width: `${(stats?.engagement.averageRating || 0) * 20}%`,
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
