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
import { BookA } from "lucide-react";

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
    <div className="relative min-h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900 to-slate-800" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10">
        <div className="grid w-full items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <BookA className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Biblioteca</p>
                <p className="text-lg font-semibold text-white">
                  Sistema de Biblioteca virtual
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-300 sm:text-base">
                Realiza la lectura de libros de manera virtual.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                <p className="text-xs uppercase text-gray-400">Estado</p>
                <p className="mt-2 text-sm text-gray-300">
                  Sistema seguro y listo
                </p>
              </div>
            </div>
          </div>

          <Card className="w-full border-slate-700 bg-slate-800/70 shadow-xl">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Bienvenido
              </CardTitle>
              <CardDescription className="text-gray-400">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="userName"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Dni
                  </label>
                  <Input
                    id="userName"
                    type="text"
                    autoComplete="dni"
                    spellCheck={false}
                    placeholder="Ej. 12345678…"
                    className="border-slate-700 bg-slate-900/60 text-slate-100 placeholder:text-gray-500 focus-visible:ring-cyan-500/40"
                    {...register("dni")}
                  />
                  {errors.dni && (
                    <p
                      className="text-sm font-medium text-red-400"
                      aria-live="polite"
                    >
                      {errors.dni.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Contrasena
                  </label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="*******"
                    className="border-slate-700 bg-slate-900/60 text-slate-100 placeholder:text-gray-500 focus-visible:ring-cyan-500/40"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p
                      className="text-sm font-medium text-red-400"
                      aria-live="polite"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {errors.root && (
                  <p
                    className="text-sm font-medium text-red-400 text-center"
                    aria-live="polite"
                  >
                    {errors.root.message}
                  </p>
                )}

                <Button
                  disabled={login.isPending}
                  type="submit"
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg transition-colors hover:from-cyan-400 hover:to-blue-600 active:scale-[0.98]"
                >
                  {login.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Ingresando…</span>
                    </div>
                  ) : (
                    "Iniciar Sesion"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
