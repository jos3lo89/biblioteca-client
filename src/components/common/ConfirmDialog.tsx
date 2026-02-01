import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: "danger" | "primary";
}

/**
 * ConfirmDialog - Scholarly refined alert dialog for critical confirmations.
 */
const ConfirmDialog = ({
  children,
  onConfirm,
  title = "¿Está seguro de proceder?",
  description = "Esta acción quedará registrada en los anales del sistema y no podrá ser revertida.",
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  variant = "primary",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0b1120] border border-white/10 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in zoom-in-95 duration-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-white tracking-tight">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400 font-serif italic text-sm leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex gap-3">
          <AlertDialogCancel className="h-11 px-6 rounded-xl bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white transition-all">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "h-11 px-6 rounded-xl font-bold shadow-lg transition-all active:scale-95",
              variant === "danger"
                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                : "bg-[#b59a5d] text-[#0b1120] hover:bg-[#c6a96e] shadow-[0_5px_15px_rgba(181,154,93,0.3)]",
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
