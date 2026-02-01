import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

/**
 * ErrorState - Refactored with the Virtual Library / Scholarly theme.
 * Harmonizes red error states with the premium academic color palette.
 */
const ErrorState = ({
  message = "No pudimos recuperar los volúmenes solicitados. Por favor, intenta de nuevo.",
  onRetry,
  title = "Error de Consulta",
}: ErrorStateProps) => {
  return (
    <div className="w-full min-h-[350px] flex flex-col items-center justify-center gap-6 p-10 text-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-backwards">
      <div className="relative">
        {/* Subtle background glow for error */}
        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />

        <div className="relative z-10 p-6 bg-[#0b1120] rounded-2xl border border-red-500/20 shadow-[0_10px_30px_rgba(239,68,68,0.15)] group transition-transform duration-500 hover:scale-105">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
      </div>

      <div className="space-y-3 max-w-sm">
        <h3 className="text-white font-bold text-2xl tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-slate-400 text-sm font-serif italic leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="h-12 px-8 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 shadow-lg hover:border-[#b59a5d]/30 hover:text-white transition-all hover:translate-y-[-2px] active:translate-y-0 active:scale-95"
        >
          <RefreshCcw className="w-4 h-4 mr-2 text-[#b59a5d]" />
          Reintentar Consulta
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
