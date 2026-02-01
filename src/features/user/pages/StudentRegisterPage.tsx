import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserPlus,
  User,
  Hash,
  Tag,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {
  registerStudentSchema,
  type RegisterStudentDto,
} from "../schemas/user.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PeriodSelector from "../components/PeriodSelector";
import { useState } from "react";

const StudentRegisterPage = () => {
  const navigate = useNavigate();
  const { registerStudent } = useUser();
  const [selectedPeriodName, setSelectedPeriodName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterStudentDto>({
    resolver: zodResolver(registerStudentSchema),
    defaultValues: {
      periodId: "",
    },
  });

  const selectedPeriodId = watch("periodId");

  const onSubmit: SubmitHandler<RegisterStudentDto> = (data) => {
    registerStudent.mutate(data, {
      onSuccess: () => {
        navigate("/admin/students");
      },
    });
  };

  const handlePeriodSelect = (id: string, name: string) => {
    setValue("periodId", id, { shouldValidate: true });
    setSelectedPeriodName(name);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="w-fit -ml-2 text-slate-500 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10 gap-2 mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al Registro
        </Button>
        <h1 className="text-4xl font-black text-white tracking-tight">
          Inscripción de <span className="text-[#b59a5d]">Nuevo Erudito</span>
        </h1>
        <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
          "El acceso al conocimiento es el primer paso hacia la trascendencia."
        </p>
        <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 xl:grid-cols-5 gap-8"
      >
        {/* Left Column: Form Details */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
                  <UserPlus className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">
                  Datos de Identidad
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DNI */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Documento de Identidad (DNI)
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("dni")}
                      placeholder="Ej: 74843113"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.dni && (
                    <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                      {errors.dni.message}
                    </p>
                  )}
                </div>

                <div className="hidden md:block" />

                {/* Name */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Nombres del Estudiante
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("name")}
                      placeholder="Ej: José Luis"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Apellidos Completos
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                    <Input
                      {...register("lastName")}
                      placeholder="Ej: Galindo Cárdenas"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* System Note */}
              <div className="p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl flex gap-3">
                <GraduationCap className="w-5 h-5 text-[#b59a5d] shrink-0" />
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  Al registrar un estudiante, se creará una cuenta de acceso
                  automática basada en sus credenciales oficiales para el uso
                  del acervo digital.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Period Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl h-full flex flex-col">
            <CardHeader className="p-8 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">
                    Periodo Académico
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Seleccione el Ciclo de Matrícula
                </label>
                <PeriodSelector
                  selectedPeriodId={selectedPeriodId}
                  onSelect={handlePeriodSelect}
                />
                {errors.periodId && (
                  <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                    ⚠️ {errors.periodId.message}
                  </p>
                )}
              </div>

              {/* Selected Highlight */}
              <div
                className={`
                p-4 rounded-2xl border transition-all duration-500
                ${
                  selectedPeriodId
                    ? "bg-[#10b981]/10 border-[#10b981]/20 opacity-100"
                    : "bg-white/2 border-white/5 opacity-40"
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 ${selectedPeriodId ? "text-[#10b981]" : "text-slate-600"}`}
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Periodo Elegido:
                    </span>
                    <p
                      className={`text-sm font-bold ${selectedPeriodId ? "text-white" : "text-slate-600 italic"}`}
                    >
                      {selectedPeriodName || "Ninguno seleccionado"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !selectedPeriodId}
                className="w-full h-14 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-[0.2em] hover:bg-[#c6a96e] rounded-2xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-30 group"
              >
                {isSubmitting ? "Consolidando..." : "Realizar Inscripción"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default StudentRegisterPage;
