import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerUserSchema,
  type RegisterUserDto,
} from "../schemas/user.schema";
import { useUser } from "../hooks/useUser";
import {
  UserPlus,
  User as UserIcon,
  Fingerprint,
  LockKeyhole,
  ShieldAlert,
  Save,
  PlusCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminUsersTable from "../components/AdminUsersTable";

/**
 * UsersAdminPage - Administrative Dashboard for managing Admin users.
 */
const UsersAdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { registerUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserDto>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      role: "ADMIN",
    },
  });

  const onSubmit = (data: RegisterUserDto) => {
    registerUser.mutate(data, {
      onSuccess: () => {
        reset();
        setIsModalOpen(false);
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Archivo de <span className="text-[#b59a5d]">Administradores</span>
          </h1>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-6 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-lg shadow-[#b59a5d]/20 flex items-center gap-2 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Nuevo Administrador
        </Button>
      </div>

      {/* Admins Table Component (Includes Search & Pagination) */}
      <AdminUsersTable />

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-[#0b1120]/95 backdrop-blur-3xl border-white/10 rounded-[2.5rem] p-0 overflow-hidden text-white">
          <DialogHeader className="p-8 border-b border-white/5 bg-white/2">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white">
                  Registrar Administrador
                </DialogTitle>
                <p className="text-xs font-serif italic text-slate-500 mt-1">
                  Inscriba personal con permisos totales de gestión.
                </p>
              </div>
            </div>
            <DialogDescription />
          </DialogHeader>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    DNI / Identidad
                  </label>
                  <div className="relative group">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("dni")}
                      placeholder="Ej: 74843113"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 rounded-xl"
                    />
                  </div>
                  {errors.dni && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.dni.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Contraseña Temporal
                  </label>
                  <div className="relative group">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 rounded-xl"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Nombres
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("name")}
                      placeholder="Ej: Jose Luis"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 rounded-xl"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Apellidos
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("lastName")}
                      placeholder="Ej: Galindo Cárdenas"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 rounded-xl"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#b59a5d] shrink-0 mt-0.5" />
                <p className="text-[11px] font-serif italic text-slate-400 leading-relaxed">
                  Atención: Los administradores tienen acceso completo a la
                  gestión del acervo bibliográfico y registros de usuarios.
                  Registre solo personal de confianza.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="h-12 px-8 flex-1 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-10 flex-1 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-2xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Registro
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersAdminPage;
