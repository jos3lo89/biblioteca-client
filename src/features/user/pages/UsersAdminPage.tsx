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
  Eraser,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * UsersAdminPage - Administrative form for enrolling new users into the system.
 */
const UsersAdminPage = () => {
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
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black text-white tracking-tight">
          Registro de <span className="text-[#b59a5d]">Usuarios</span>
        </h1>
        <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
      </div>

      {/* Form Card */}
      <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        <CardHeader className="p-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-white">
                Formulario de Inscripción
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. Identity Data */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-4 h-4 text-[#b59a5d]/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Información de Identidad
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* DNI */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    DNI / Documento
                  </label>
                  <div className="relative group">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("dni")}
                      autoComplete="off"
                      placeholder="Ej: 74843113"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.dni && (
                    <p className="text-xs font-bold text-red-400 mt-1 ml-1">
                      {errors.dni.message}
                    </p>
                  )}
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    Rol en el Sistema
                  </label>
                  <div className="relative group">
                    <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <select
                      {...register("role")}
                      className="w-full h-12 pl-12 bg-white/5 border border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl appearance-none cursor-pointer"
                    >
                      <option value="STUDENT" className="bg-[#0b1120]">
                        Estudiante (Lectura)
                      </option>
                      <option value="ADMIN" className="bg-[#0b1120]">
                        Administrador (Total)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    Nombres
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("name")}
                      placeholder="Ej: Jose Luis"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-bold text-red-400 mt-1 ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* LastName */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    Apellidos
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("lastName")}
                      placeholder="Ej: Galindo Cárdenas"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs font-bold text-red-400 mt-1 ml-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Security Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <LockKeyhole className="w-4 h-4 text-[#b59a5d]/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Credenciales de Acceso
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    Contraseña Inicial
                  </label>
                  <div className="relative group">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs font-bold text-red-400 mt-1 ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Help Text */}
                <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-serif italic text-slate-500 leading-relaxed">
                    Asegúrese de que el usuario cambie su contraseña una vez que
                    acceda por primera vez.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => reset()}
                className="h-12 px-8 flex-1 sm:flex-none border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
              >
                <Eraser className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-8 flex-1 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-2xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Registrar Miembro
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersAdminPage;
