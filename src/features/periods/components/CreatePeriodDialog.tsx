import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Tag, PlusCircle, CheckCircle2 } from "lucide-react";
import { usePeriod } from "../hooks/usePeriod";
import {
  createdPeriodSchema,
  type CreatedPeriodSchemaT,
} from "../schemas/period.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreatePeriodDialog = () => {
  const [open, setOpen] = useState(false);
  const { createPeriod } = usePeriod();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatedPeriodSchemaT>({
    resolver: zodResolver(createdPeriodSchema),
    defaultValues: {
      isCurrent: false,
    },
  });

  const onSubmit: SubmitHandler<CreatedPeriodSchemaT> = (data) => {
    createPeriod.mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 bg-[#b59a5d] text-[#0b1120] font-bold uppercase tracking-wider hover:bg-[#c6a96e] rounded-2xl transition-all shadow-lg shadow-[#b59a5d]/20 active:scale-95">
          <PlusCircle className="w-5 h-5 mr-2" />
          Añadir Periodo
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0b1120] border-white/10 rounded-[2.5rem] p-8 max-w-md">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
              <Calendar className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black text-white tracking-tight">
              Nuevo <span className="text-[#b59a5d]">Periodo</span>
            </DialogTitle>
            <DialogDescription />
          </div>
          <p className="text-slate-400 text-sm font-serif italic">
            Defina los límites temporales para el ciclo académico del archivo.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Nombre del Periodo
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
              <Input
                {...register("name")}
                placeholder="Ej: 2026-I"
                className="h-12 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
              />
            </div>
            {errors.name && (
              <p className="text-xs font-bold text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-left-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Fecha Inicio
              </label>
              <Input
                {...register("startDate")}
                type="date"
                className="h-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl scheme-dark"
              />
              {errors.startDate && (
                <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Fecha Fin
              </label>
              <Input
                {...register("endDate")}
                type="date"
                className="h-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl scheme-dark"
              />
              {errors.endDate && (
                <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl cursor-pointer hover:bg-[#b59a5d]/10 transition-colors group">
            <input
              type="checkbox"
              id="isCurrent"
              {...register("isCurrent")}
              className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#b59a5d] focus:ring-[#b59a5d]/50 cursor-pointer"
            />
            <label
              htmlFor="isCurrent"
              className="text-xs font-bold text-slate-300 cursor-pointer flex-1"
            >
              Establecer como periodo actual
            </label>
            <CheckCircle2 className="w-4 h-4 text-[#b59a5d] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="h-12 flex-1 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 flex-2 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Crear Periodo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePeriodDialog;
