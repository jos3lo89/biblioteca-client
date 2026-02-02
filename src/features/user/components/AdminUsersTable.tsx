import { useState } from "react";
import { useUser } from "../hooks/useUser";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Fingerprint,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const AdminUsersTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;
  const { listUsersAdmin } = useUser();

  const {
    data: adminResponse,
    isLoading,
    isError,
    refetch,
  } = listUsersAdmin(page, limit, searchTerm);

  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    reset: resetSearch,
  } = useForm<{ search: string }>();

  const onSearchSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
    setPage(1);
  };

  const clearSearch = () => {
    resetSearch({ search: "" });
    setSearchTerm("");
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="Consultando el personal administrativo..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="No se pudo recuperar el listado de administradores."
        onRetry={() => refetch()}
        title="Error de Conexión"
      />
    );
  }

  const meta = adminResponse?.meta;
  const admins = adminResponse?.data || [];

  return (
    <div className="bg-[#0d1627]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Table Search Bar */}
      <div className="p-6 border-b border-white/5 bg-white/2">
        <form
          onSubmit={handleSubmitSearch(onSearchSubmit)}
          className="relative flex-1 group flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
            <Input
              {...registerSearch("search")}
              placeholder="Buscar por nombre o DNI..."
              className="h-12 w-full pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="h-12 px-6 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-lg active:scale-95"
          >
            Buscar
          </Button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/1">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Administrador
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Identidad
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                Jerarquía
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="group hover:bg-white/2 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20 group-hover:scale-110 transition-transform">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-tight text-lg leading-none mb-1">
                          {admin.name} {admin.lastName}
                        </p>
                        <p
                          className="text-slate-500 text-xs font-serif italic"
                          title="Administrador de Acervo"
                        >
                          Personal del Sistema
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-xs bg-white/5 px-3 py-1.5 rounded-lg w-fit border border-white/5">
                      <Fingerprint className="w-3.5 h-3.5 text-[#b59a5d]/60" />
                      {admin.dni}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 bg-[#b59a5d]/10 text-[#b59a5d] px-4 py-1.5 rounded-full border border-[#b59a5d]/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Admin
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-500 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10 rounded-xl"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-white/5 text-slate-600">
                      <User className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-500 font-serif italic text-lg">
                        {searchTerm
                          ? `No se encontraron resultados para "${searchTerm}"`
                          : "No se han encontrado registros en este archivo."}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="text-[#b59a5d] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8"
                        >
                          Limpiar búsqueda
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-white/5 bg-white/1 flex items-center justify-between">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Mostrando {admins.length} de {meta?.total || 0} Registros
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!meta?.hasPrev}
            onClick={() => setPage((p) => p - 1)}
            className="h-10 w-10 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center px-4 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-[#b59a5d]">
            {page} / {meta?.lastPage || 1}
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled={!meta?.hasNext}
            onClick={() => setPage((p) => p + 1)}
            className="h-10 w-10 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
