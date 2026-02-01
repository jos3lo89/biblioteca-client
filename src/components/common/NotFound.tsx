import { ArrowLeft, BookX, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

/**
 * NotFound Page - Refactored with the Virtual Library / Scholarly theme.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0b1120] flex flex-col items-center justify-center p-6 text-slate-100 overflow-hidden font-sans selection:bg-[#b59a5d]/30">
      {/* Dynamic Background Elements - Skill: frontend-design */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#b59a5d]/10 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />

      <div className="relative z-10 max-w-md w-full animate-in fade-in zoom-in duration-700 ease-out">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#b59a5d] to-transparent opacity-50" />

          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#b59a5d]/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 bg-[#0b1120] rounded-full flex items-center justify-center border border-white/5 shadow-inner group transition-transform duration-500 hover:rotate-12">
              <BookX className="w-10 h-10 text-[#b59a5d]" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 tracking-tighter">
              404
            </h1>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Tomo no encontrado
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[90%] mx-auto font-serif italic">
              "Incluso en la biblioteca más vasta, algunos registros parecen
              desvanecerse en el tiempo."
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 h-12 border-white/10 bg-white/5 text-slate-300 hover:bg-white/20 hover:text-white hover:border-[#b59a5d]/30 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Regresar
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="flex-1 h-12 bg-[#b59a5d] hover:bg-[#c6a96e] text-[#0b1120] font-bold shadow-[0_10px_20px_rgba(181,154,93,0.2)] transition-all hover:translate-y-[-2px] active:translate-y-0 active:scale-95"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-backwards">
        <p className="text-xs text-slate-600 font-medium tracking-[0.2em] uppercase">
          Sistema de Biblioteca Virtual
        </p>
      </div>
    </div>
  );
};

export default NotFound;
