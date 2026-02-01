import {
  BarChart3,
  Users,
  BookOpen,
  History,
  ArrowUpRight,
  Library,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * DashboardPage - Analytical overview of the library system.
 */
const DashboardPage = () => {
  const stats = [
    { label: "Usuarios Activos", value: "1,284", icon: Users, trend: "+12%" },
    { label: "Acervo Digital", value: "856", icon: Library, trend: "+3%" },
    { label: "Lecturas Hoy", value: "42", icon: BookOpen, trend: "+18%" },
    { label: "Matrículas", value: "156", icon: GraduationCap, trend: "+5%" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white tracking-tight">
          Panel de <span className="text-[#b59a5d]">Control</span>
        </h1>
        <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
          "Supervise el flujo de conocimiento y la integridad de los registros
          académicos."
        </p>
        <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
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
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center mt-1 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </CardContent>
            {/* Background Accent */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#b59a5d]/5 blur-3xl rounded-full" />
          </Card>
        ))}
      </div>

      {/* Activity Section Placeholder */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <Card className="bg-[#0d1627]/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-16 h-16 text-white/5 mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">
            Actividad de Lectura
          </h3>
          <p className="text-slate-500 text-sm max-w-sm">
            Los gráficos de análisis de tráfico se están sincronizando con el
            servidor central de MinIO.
          </p>
        </Card>

        <Card className="bg-[#0b1120] border-white/5 rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-8">
            <History className="w-5 h-5 text-[#b59a5d]" />
            <h3 className="text-lg font-bold text-white">Eventos Recientes</h3>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 group">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#b59a5d] mt-1.5" />
                  {i !== 4 && (
                    <div className="absolute top-4 left-1 w-px h-full bg-white/5" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200 group-hover:text-[#b59a5d] transition-colors cursor-default">
                    Nuevo Usuario Registrado
                  </p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-600">
                    Hace {i * 12} minutos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
