import LoadingState from "@/components/common/LoadingState";
import { useCategory } from "../hooks/useCategory";
import ErrorState from "@/components/common/ErrorState";
import {
  PlusCircle,
  Layers,
  Hash,
  BookOpen,
  ChevronRight,
  MoreVertical,
  Calendar,
  Search,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

/**
 * ListCategoriesPage - Administrative register of all manuscript classifications.
 */
const ListCategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;
  const { getCategories } = useCategory();

  const {
    data: categoriesResponse,
    isLoading,
    isError,
    refetch,
  } = getCategories(page, limit, searchTerm);

  const { register, handleSubmit, reset } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const handleSearch = (values: { search: string }) => {
    setSearchTerm(values.search);
    setPage(1);
  };

  const clearSearch = () => {
    reset();
    setSearchTerm("");
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="Consultando el archivo de categorías..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="No se pudo recuperar el listado de categorías del servidor."
        onRetry={() => refetch()}
        title="Error de Conexión"
      />
    );
  }

  const categories = categoriesResponse?.data || [];
  const meta = categoriesResponse?.meta;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Archivo de <span className="text-[#b59a5d]">Categorías</span>
          </h1>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>

        <Link to="/admin/categories/create">
          <Button className="h-12 px-6 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-lg shadow-[#b59a5d]/20 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Nueva Categoría
          </Button>
        </Link>
      </div>

      {/* Table & Filtering */}
      <div className="bg-[#0d1627]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Table Search Bar */}
        <div className="p-6 border-b border-white/5 bg-white/2">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="relative flex-1 group flex gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
              <Input
                {...register("search")}
                placeholder="Buscar por nombre o slug..."
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

        {/* Scholarly Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/1">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Categoría
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Identificador
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                  Volúmenes
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Registro
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="group hover:bg-white/2 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20 group-hover:scale-110 transition-transform">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold tracking-tight text-lg leading-none mb-1">
                            {cat.name}
                          </p>
                          <p className="text-slate-500 text-xs font-serif italic">
                            Clasificación Principal
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400 font-mono text-xs bg-white/5 px-3 py-1.5 rounded-lg w-fit border border-white/5">
                        <Hash className="w-3.5 h-3.5 text-[#b59a5d]/60" />
                        {cat.slug}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-[#b59a5d] leading-none">
                          {cat._count?.books || 0}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">
                          Libros
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        {new Date(cat.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 rounded-full bg-white/5 text-slate-600">
                        <BookOpen className="w-10 h-10" />
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

        {/* Pagination Footer */}
        <div className="p-6 border-t border-white/5 bg-white/1 flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            Mostrando {categories.length} de {meta?.total || 0} Entradas
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
    </div>
  );
};

export default ListCategoriesPage;
