import { useState } from "react";
import { useBook } from "../hooks/useBook";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  Calendar,
  MoreVertical,
  Layers,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BooksTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookToDelete, setBookToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const limit = 5;
  const { listBooks, deleteBook } = useBook();

  const {
    data: booksResponse,
    isLoading,
    isError,
    refetch,
  } = listBooks(page, limit, searchTerm);

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
    return <LoadingState message="Consultando el barchivo de libros..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="No se pudo recuperar el listado de tomos del servidor."
        onRetry={() => refetch()}
        title="Error de Conexión"
      />
    );
  }

  const books = booksResponse?.data || [];
  const meta = booksResponse?.meta;

  return (
    <div className="bg-[#0d1627]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Search Bar */}
      <div className="p-6 border-b border-white/5 bg-white/2">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="relative flex-1 group flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
            <Input
              {...register("search")}
              placeholder="Buscar por título o autor..."
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
                Tomo / Obra
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Categoría
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
                Valoración
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
            {books.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="group hover:bg-white/2 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-500 shrink-0">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0b1120] to-transparent opacity-40" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold tracking-tight text-lg leading-tight mb-1 truncate max-w-[200px] sm:max-w-xs">
                          {book.title}
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-serif italic">
                          <User className="w-3 h-3 text-[#b59a5d]/60" />
                          <span className="truncate">{book.author}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 bg-[#b59a5d]/10 text-[#b59a5d] px-3 py-1.5 rounded-lg border border-[#b59a5d]/20 w-fit">
                      <Layers className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {book.category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-black text-white leading-none">
                        {book._count.ratings > 0 ? (
                          <span className="text-[#b59a5d]">★</span>
                        ) : (
                          <span className="text-slate-700">☆</span>
                        )}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">
                        {book._count.reviews} Reseñas
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      {new Date(book.createdAt).toLocaleDateString("es-ES", {
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
                        onClick={() =>
                          setBookToDelete({ id: book.id, title: book.title })
                        }
                        className="h-10 w-10 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
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
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-white/5 text-slate-600">
                      <BookOpen className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-500 font-serif italic text-lg">
                        {searchTerm
                          ? `No se encontraron resultados para "${searchTerm}"`
                          : "No se han encontrado tomos en este archivo."}
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
          Mostrando {books.length} de {meta?.total || 0} Entradas
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!bookToDelete}
        onOpenChange={(open) => !open && setBookToDelete(null)}
      >
        <AlertDialogContent className="max-w-xl bg-[#0b1120]/95 backdrop-blur-3xl border-white/10 rounded-[2.5rem] p-0 overflow-hidden text-white shadow-2xl">
          <AlertDialogHeader className="p-8 border-b border-white/5 bg-white/2">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight text-white text-left">
                  ¿Eliminar <span className="text-[#b59a5d]">Tomo?</span>
                </AlertDialogTitle>
                <p className="text-xs font-serif italic text-slate-500 mt-1">
                  Acción de borrado permanente de registro digital.
                </p>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="p-8 space-y-6">
            <AlertDialogDescription className="text-slate-400 font-serif italic text-lg leading-relaxed">
              Esta acción es irreversible. Se eliminará el registro de
              <span className="text-white font-bold not-italic ml-1">
                "{bookToDelete?.title}"
              </span>
              del archivo digital de forma permanente.
            </AlertDialogDescription>

            <div className="p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[#b59a5d]/10 text-[#b59a5d] shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                Nota: Todos los registros asociados, incluyendo reseñas y
                archivos almacenados en la nube, serán purgados del sistema
                central de la biblioteca.
              </p>
            </div>
          </div>

          <AlertDialogFooter className="p-8 bg-white/2 border-t border-white/5 gap-4">
            <AlertDialogCancel className="h-12 px-8 bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] m-0!">
              Conservar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (bookToDelete) {
                  deleteBook.mutate(bookToDelete.id, {
                    onSuccess: () => setBookToDelete(null),
                  });
                }
              }}
              className="h-12 px-8 bg-red-600/90 text-white hover:bg-red-500 rounded-2xl transition-all shadow-xl shadow-red-500/10 font-black uppercase tracking-widest text-[10px] border border-red-500/20"
            >
              Confirmar Purga
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BooksTable;
