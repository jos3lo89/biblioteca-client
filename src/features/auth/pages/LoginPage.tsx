import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaT } from "../schemas/auth.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Library,
  LockKeyhole,
  UserRound,
  GraduationCap,
  BookOpenCheck,
} from "lucide-react";

/**
 * LoginPage - Refactored with a Virtual Library / Scholarly theme.
 * Integrates guidelines from:
 * 1. frontend-design (Bold aesthetics, brass accents, motion)
 * 2. vercel-react-best-practices (Optimized patterns)
 * 3. web-design-guidelines (Accessibility, hierarchy)
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaT) => {
    login.mutate(data, {
      onSuccess: (data) => {
        if (data.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0b1120] text-slate-100 overflow-hidden font-sans selection:bg-[#b59a5d]/30">
      {/* Dynamic Background Elements - Skill: frontend-design */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#b59a5d]/10 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column: Branding & Value Proposition */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-[#b59a5d] to-[#8c7344] flex items-center justify-center shadow-[0_0_30px_rgba(181,154,93,0.3)] transition-transform duration-500 group-hover:rotate-12">
                  <Library
                    className="w-9 h-9 text-[#0b1120]"
                    aria-hidden="true"
                  />
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <GraduationCap className="w-4 h-4 text-[#b59a5d]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#b59a5d]">
                    Acervo
                  </h2>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                    Biblioteca Virtual
                  </h1>
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <p className="text-lg text-slate-300 leading-relaxed font-serif italic">
                  "Donde el conocimiento se encuentra con la posteridad."
                </p>
                <div className="h-1 w-20 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full" />
                <p className="text-slate-400 text-base">
                  Accede a nuestra colección de libros publicados por los
                  administradores. Explora, aprende y crece en un entorno
                  diseñado para el estudio profundo.
                </p>
              </div>
            </div>

            {/* <div className="grid gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-[#b59a5d]/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#b59a5d]/20 text-[#b59a5d]">
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Curaduría Experta
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Libros seleccionados y publicados bajo estrictos estándares
                  académicos.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-[#b59a5d]/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <LockKeyhole className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Entorno Seguro
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Infraestructura protegida para garantizar la integridad de tu
                  lectura.
                </p>
              </div>
            </div> */}
          </div>

          {/* Right Column: Login Card */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 ease-out fill-mode-backwards">
            <Card className="w-full border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#b59a5d] to-transparent opacity-50" />

              <CardHeader className="space-y-1 pt-8 pb-6 px-8 text-center">
                <CardTitle className="text-3xl font-bold text-white tracking-tight">
                  Bienvenido
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Ingresa tus credenciales académicas
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="dni"
                      className="text-xs font-bold uppercase tracking-wider text-[#b59a5d] ml-1"
                    >
                      DNI del Usuario
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#b59a5d]">
                        <UserRound className="w-5 h-5" />
                      </div>
                      <Input
                        id="dni"
                        type="text"
                        autoComplete="username"
                        placeholder="Ej. 12345678"
                        className="pl-11 h-12 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-[#b59a5d] focus-visible:border-[#b59a5d] transition-all"
                        {...register("dni")}
                      />
                    </div>
                    {errors.dni && (
                      <p className="text-xs font-medium text-red-400 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                        {errors.dni.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold uppercase tracking-wider text-[#b59a5d] ml-1"
                    >
                      Contraseña
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#b59a5d]">
                        <LockKeyhole className="w-5 h-5" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="pl-11 h-12 border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-[#b59a5d] focus-visible:border-[#b59a5d] transition-all"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs font-medium text-red-400 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {errors.root && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                      <p className="text-xs font-medium text-red-400">
                        {errors.root.message}
                      </p>
                    </div>
                  )}

                  <Button
                    disabled={login.isPending}
                    type="submit"
                    className="w-full h-12 bg-[#b59a5d] hover:bg-[#c6a96e] text-[#0b1120] font-bold text-base shadow-[0_10px_20px_rgba(181,154,93,0.2)] transition-all hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-70"
                  >
                    {login.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b1120] border-t-transparent" />
                        <span>Verificando...</span>
                      </div>
                    ) : (
                      "Acceder al Sistema"
                    )}
                  </Button>
                </form>

                {/* <div className="mt-8 text-center">
                  <p className="text-xs text-slate-500 italic">
                    Sistema de Gestión de Acervo Bibliográfico v1.0
                  </p>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
