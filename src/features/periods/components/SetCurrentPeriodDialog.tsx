import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePeriod } from "../hooks/usePeriod";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

type Props = {
  periodId: string;
  periodName: string;
  trigger: React.ReactNode;
};

const SetCurrentPeriodDialog = ({ periodId, periodName, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const { setCurrent } = usePeriod();

  const handleSetCurrent = () => {
    setCurrent.mutate(periodId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#0b1120] border-white/10 rounded-[2.5rem] p-8 max-w-md">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-[#b59a5d]/10 text-[#b59a5d] shadow-[0_0_20px_rgba(181,154,93,0.1)]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-white tracking-tight uppercase">
                Asignar <span className="text-[#b59a5d]">Actual</span>
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs font-serif italic mt-1">
                Protocolo de actualización de ciclo académico.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#b59a5d] shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                ¿Está seguro de establecer el periodo{" "}
                <span className="text-white font-bold">"{periodName}"</span>{" "}
                como el actual sistema de registro?
              </p>
            </div>
            <p className="text-[11px] text-slate-500 font-medium pl-8">
              Esta acción marcará automáticamente los otros periodos como
              inactivos en el tablero principal.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-8 flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="flex-1 h-12 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSetCurrent}
            disabled={setCurrent.isPending}
            className="flex-2 h-12 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
          >
            {setCurrent.isPending ? (
              "Procesando..."
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Confirmar Cambio
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetCurrentPeriodDialog;
