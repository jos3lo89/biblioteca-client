import { useState, useMemo } from "react";
import { useBook } from "../hooks/useBook";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

/**
 * BooksPage - Professional Virtual Library Catalog.
 * Features:
 * - Scholarly Dark Theme (Deep Blue & Brass)
 * - Name Search
 * - Category Filtering
 * - Responsive Premium Grid
 * - Smooth Staggered Animations
 */
const BooksPage = () => {
  const { listBooks } = useBook();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // Derive unique categories from books - Skill: vercel-react-best-practices
  const categories = useMemo(() => {
    if (!listBooks.data) return [];
    const unique = new Map();
    listBooks.data.forEach((book) => {
      if (book.category) {
        unique.set(book.category.id, book.category);
      }
    });
    return Array.from(unique.values());
  }, [listBooks.data]);

  // Client-side filtering logic
  const filteredBooks = useMemo(() => {
    if (!listBooks.data) return [];
    return listBooks.data.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? book.categoryId === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [listBooks.data, searchQuery, selectedCategory]);

  const handleBookClick = (id: string) => {
    console.log("Visualizando Libro ID:", id);
    navigate(`/book/${id}`);
  };

  if (listBooks.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingState message="Catalogando el acervo virtual..." />
      </div>
    );
  }

  if (listBooks.isError) {
    return (
      <div className="py-12 px-4">
        <ErrorState
          onRetry={() => listBooks.refetch()}
          title="Error de Acceso al Archivo"
          message="No se pudo conectar con el repositorio de libros. Verifique su conexión."
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out  fill-mode-backwards p-4">
      {/* Header & Controls Section */}
      <section className="space-y-8 relative">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
            Acervo <span className="text-[#b59a5d]">Bibliográfico</span>
          </h1>
          <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
            "Explora la sabiduría colectiva curada por nuestros administradores
            maestros."
          </p>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-4 shadow-[0_0_15px_rgba(181,154,93,0.3)]" />
        </div>

        {/* Filters & Search - Skill: frontend-design */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#b59a5d]">
              <Search className="w-5 h-5" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título o autor..."
              className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus-visible:ring-1 focus-visible:ring-[#b59a5d] focus-visible:border-[#b59a5d] transition-all shadow-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-5 h-12 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border active:scale-95",
                !selectedCategory
                  ? "bg-[#b59a5d] text-[#0b1120] border-[#b59a5d] shadow-[0_5px_15px_rgba(181,154,93,0.3)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white",
              )}
            >
              <Filter className="w-4 h-4" />
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-5 h-12 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border active:scale-95",
                  selectedCategory === cat.id
                    ? "bg-[#b59a5d] text-[#0b1120] border-[#b59a5d] shadow-[0_5px_15px_rgba(181,154,93,0.3)]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white",
                )}
              >
                <Tag className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#b59a5d]/40 hover:translate-y-[-8px] cursor-pointer shadow-2xl animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
              >
                {/* Book Cover Container */}
                <div className="aspect-[3/4.5] relative overflow-hidden bg-[#0b1120]">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 bg-[linear-gradient(45deg,#0b1120_25%,#0f172a_25%,#0f172a_50%,#0b1120_50%,#0b1120_75%,#0f172a_75%,#0f172a_100%)] bg-size-[20px_20px]">
                      <BookOpen className="w-12 h-12 mb-2 opacity-20" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        In Absentia
                      </span>
                    </div>
                  )}
                  {/* Premium Overlays */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0b1120] to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 bg-[#b59a5d]/90 backdrop-blur-sm text-[#0b1120] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    {book.category?.name}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-white font-extrabold text-xl leading-tight line-clamp-2 group-hover:text-[#b59a5d] transition-colors">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
                      <User className="w-3.5 h-3.5 text-[#b59a5d]" />
                      <p className="text-sm font-medium tracking-wide">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                      Ref. {book.id.slice(0, 8)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#b59a5d] group-hover:bg-[#b59a5d] group-hover:text-[#0b1120] transition-all duration-300">
                      <BookOpen className="w-4 h-4" />
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
            <div className="space-y-2 max-w-sm">
              <h3 className="text-white font-bold text-xl leading-tight">
                Sin registros encontrados
              </h3>
              <p className="text-slate-500 font-serif italic text-sm">
                La búsqueda "{searchQuery}" no coincide con ningún tomo en
                nuestro acervo actual. Intente con términos alternativos o
                categorías diferentes.
              </p>
            </div>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-4 text-[#b59a5d] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </section>

      {/* Footer Insight */}
      <div className="pt-10 text-center font-serif text-slate-600 text-xs italic tracking-wide">
        Registros almacenados bajo la supervisión del Sistema de Gestión de
        Acervo Bibliográfico v1.0
      </div>
    </div>
  );
};

export default BooksPage;
