import { useAuthStore } from "@/stores/auth.store";
import {
  User,
  LogOut,
  Shield,
  Fingerprint,
  Hash,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * ProfilePage - Scholarly view for user identity and security.
 */
const ProfilePage = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout.mutate();
  };

  const infoItems = [
    { label: "Nombres", value: user.name, icon: User },
    { label: "Apellidos", value: user.lastName, icon: User },
    { label: "DNI / Identificación", value: user.dni, icon: Fingerprint },
    { label: "Rol de Acceso", value: user.role, icon: Shield, highlight: true },
    { label: "ID de Registro", value: user.id, icon: Hash },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-backwards p-4">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="w-fit text-slate-400 hover:text-white hover:bg-white/5 group border border-transparent hover:border-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Button>

        <section className="relative space-y-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
              Identidad <span className="text-[#b59a5d]">Académica</span>
            </h1>
            <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
              "El conocimiento de uno mismo es el primer paso hacia la sabiduría
              universal."
            </p>
            <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2 shadow-[0_0_15px_rgba(181,154,93,0.3)]" />
          </div>
        </section>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Left: Avatar & Quick Actions */}
        <div className="space-y-6">
          <div className="aspect-square relative group">
            <div className="absolute inset-0 bg-[#b59a5d]/10 blur-2xl rounded-full" />
            <div className="relative z-10 w-full h-full bg-[#0b1120] border-2 border-white/10 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-[#b59a5d]/40 transition-all duration-500">
              <span className="text-7xl font-black text-[#b59a5d] select-none">
                {user.name.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
              <div className="absolute inset-0 bg-linear-to-t from-[#b59a5d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-white/60">
              <BookOpen className="w-4 h-4 text-[#b59a5d]" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Estatus de Seguridad
              </span>
            </div>
            <p className="text-emerald-400 font-bold flex items-center gap-2 text-sm italic font-serif">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sesión Autorizada
            </p>
          </div>
        </div>

        {/* Right: Detailed Information */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-8">
                {infoItems.map((item, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {item.label}
                      </span>
                    </div>
                    <p
                      className={`text-lg font-bold tracking-tight ${item.highlight ? "text-[#b59a5d]" : "text-white"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-white font-bold">Finalizar Sesión</p>
                <p className="text-slate-500 text-xs font-serif italic">
                  Cierra tu acceso para proteger el acervo.
                </p>
              </div>

              <ConfirmDialog
                title="¿Terminar Consulta?"
                description="¿Está seguro de que desea cerrar su sesión actual en la Biblioteca Virtual?"
                confirmText="Cerrar Sesión"
                variant="danger"
                onConfirm={handleLogout}
              >
                <Button
                  variant="destructive"
                  className="h-12 px-8 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl transition-all flex items-center gap-2 group shadow-lg"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Cerrar Sesión
                </Button>
              </ConfirmDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-10 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">
          Firma Digital v1.22.4
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
