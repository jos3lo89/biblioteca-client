import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  message?: string;
};

/**
 * LoadingState - Refactored with the Virtual Library / Scholarly theme.
 */
const LoadingState = ({
  message = "Consultando el acervo...",
}: LoadingStateProps) => {
  return (
    <div className="w-full min-h-[300px] flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 animate-in fade-in duration-500">
      <div className="relative">
        {/* Scholarly Brass Glow */}
        <div className="absolute inset-0 bg-[#b59a5d]/20 blur-2xl rounded-full animate-pulse" />

        <div className="relative z-10 p-4 rounded-full bg-[#0b1120] border border-white/10 shadow-xl">
          <Loader2 className="w-10 h-10 text-[#b59a5d] animate-spin" />
        </div>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-[#b59a5d] text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
          {message}
        </p>
        <p className="text-slate-500 text-xs font-serif italic">
          Buscando en los registros históricos
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
