import CreatePeriodDialog from "../components/CreatePeriodDialog";
import PeriodsList from "../components/PeriodsList";

/**
 * PeriodsPages - Administrative management of academic periods for the digital library.
 */
const PeriodsPages = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Archivo de <span className="text-[#b59a5d]">Periodos</span>
          </h1>
          {/* <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
            Gestión y control de los ciclos académicos en el archivo.
          </p>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" /> */}
        </div>

        <CreatePeriodDialog />
      </div>

      {/* Table & Filtering */}
      <PeriodsList />
    </div>
  );
};

export default PeriodsPages;
