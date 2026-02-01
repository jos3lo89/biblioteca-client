import { useState } from "react";
import { useBook } from "../hooks/useBook";
import { useCategory } from "@/features/category/hooks/useCategory";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  BookOpen,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

/**
 * BooksPage - Professional Virtual Library Catalog.
 * Updated with Server-side search and pagination.
 */
const BooksPage = () => {
  const navigate = useNavigate();

  // State for Server-side Search & Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { listBooks } = useBook();
  const { getAllCategories } = useCategory();

  const {
    data: booksData,
    isLoading,
    isError,
    refetch,
  } = listBooks(page, limit, searchTerm, selectedCategory || "");

  const { register, handleSubmit, reset } = useForm<{
    search: string;
  }>({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (values: { search: string }) => {
    setSearchTerm(values.search);
    setPage(1); // Reset to first page on new search
  };

  const clearSearch = () => {
    reset();
    setSearchTerm("");
    setPage(1);
  };

  const handleBookClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const books = booksData?.data || [];
  const meta = booksData?.meta;
  const categories = getAllCategories.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingState message="Catalogando el acervo virtual..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 px-4">
        <ErrorState
          onRetry={() => refetch()}
          title="Error de Acceso al Archivo"
          message="No se pudo conectar con el repositorio de libros. Verifique su conexión."
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards p-4">
      {/* Header Section */}
      <section className="space-y-8 relative">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
            Acervo <span className="text-[#b59a5d]">Bibliográfico</span>
          </h1>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="flex gap-3 max-w-3xl"
          >
            <div className="relative flex-1 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#b59a5d]">
                <Search className="w-5 h-5" />
              </div>
              <Input
                {...register("search")}
                placeholder="Buscar por título o autor..."
                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus-visible:ring-1 focus-visible:ring-[#b59a5d] focus-visible:border-[#b59a5d] transition-all shadow-xl"
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
              className="h-14 px-8 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-2xl transition-all shadow-lg active:scale-95"
            >
              Buscar
            </Button>
          </form>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className={cn(
                "px-5 h-10 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-2 border active:scale-95",
                !selectedCategory
                  ? "bg-[#b59a5d] text-[#0b1120] border-[#b59a5d] shadow-[0_5px_15px_rgba(181,154,93,0.3)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white",
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setPage(1);
                }}
                className={cn(
                  "px-5 h-10 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-2 border active:scale-95",
                  selectedCategory === cat.slug
                    ? "bg-[#b59a5d] text-[#0b1120] border-[#b59a5d] shadow-[0_5px_15px_rgba(181,154,93,0.3)]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white",
                )}
              >
                <Tag className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative">
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book, index) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                style={{ animationDelay: `${index * 40}ms` }}
                className="group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-t-[2rem] overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#b59a5d]/40 hover:translate-y-[-6px] cursor-pointer shadow-2xl animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards"
              >
                {/* Book Cover Container - Slightly smaller aspect ratio */}
                <div className="aspect-[3/4.2] relative overflow-hidden bg-[#0b1120]">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 bg-[linear-gradient(45deg,#0b1120_25%,#0f172a_25%,#0f172a_50%,#0b1120_50%,#0b1120_75%,#0f172a_75%,#0f172a_100%)] bg-size-[20px_20px]">
                      <BookOpen className="w-10 h-10 mb-2 opacity-20" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        In Absentia
                      </span>
                    </div>
                  )}
                  {/* Premium Overlays */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0b1120] to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-[#b59a5d]/90 backdrop-blur-sm text-[#0b1120] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg text-center">
                      Visualizar Tomo
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-white font-extrabold text-lg leading-snug line-clamp-2 group-hover:text-[#b59a5d] transition-colors">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
                      <User className="w-3 h-3 text-[#b59a5d]" />
                      <p className="text-xs font-medium tracking-wide">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                      {book.category?.name || "Sin Categoría"}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#b59a5d] group-hover:bg-[#b59a5d] group-hover:text-[#0b1120] transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Interactive Brass Line */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#b59a5d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 px-4 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 bg-white/2">
            <div className="p-6 bg-white/5 rounded-full border border-white/10">
              <Search className="w-12 h-12 text-slate-700" />
            </div>
            <div className="space-y-2 max-w-sm text-center">
              <h3 className="text-white font-bold text-xl leading-tight">
                Sin registros encontrados
              </h3>
              <p className="text-slate-500 font-serif italic text-sm">
                La combinación de búsqueda y filtros no coincide con ningún tomo
                en nuestro acervo actual.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="px-6 h-10 rounded-xl text-[11px] font-black uppercase tracking-widest text-[#b59a5d] border border-[#b59a5d]/30 hover:bg-[#b59a5d]/10 transition-all active:scale-95"
                >
                  Limpiar búsqueda
                </button>
              )}
              {selectedCategory && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPage(1);
                  }}
                  className="px-6 h-10 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-400 border border-white/10 hover:border-white/30 hover:text-white transition-all active:scale-95"
                >
                  Ver todas las categorías
                </button>
              )}
              {!searchTerm && !selectedCategory && (
                <button
                  onClick={() => refetch()}
                  className="px-6 h-10 rounded-xl text-[11px] font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                >
                  Actualizar Acervo
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      {meta && meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10">
          <Button
            variant="ghost"
            disabled={!meta.hasPrev}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-2 scrollbar-none overflow-x-auto max-w-[300px] sm:max-w-none px-2 py-1">
            {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-10 h-10 shrink-0 rounded-xl text-xs font-black transition-all",
                  page === p
                    ? "bg-[#b59a5d]/20 text-[#b59a5d] border border-[#b59a5d]/30 shadow-lg"
                    : "text-slate-500 hover:text-white hover:bg-white/5",
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            disabled={!meta.hasNext}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10 rounded-xl"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
