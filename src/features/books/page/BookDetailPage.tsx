import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  ArrowLeft,
  BookOpen,
  User,
  Tag,
  Calendar,
  Hash,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStars from "@/features/ratings/components/RatingStars";
import ReviewSection from "@/features/reviews/components/ReviewSection";

/**
 * BookDetailPage - Premium Virtual Library Detail View.
 * Displays comprehensive book details with a scholarly dark aesthetic.
 */
const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBook();

  // Handle case where ID might be undefined in URL
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <ErrorState
          title="Identificador No Válido"
          message="No se ha proporcionado un identificador de registro válido para la consulta."
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  const { data: book, isLoading, isError } = getBookById(id);

  const handleReadClick = () => {
    console.log("Iniciando lectura de Libro ID:", id);
    navigate(`/book/${id}/reading`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <LoadingState message="Recuperando manuscrito del archivo..." />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <ErrorState
          title="Registro No Encontrado"
          message="El libro solicitado no existe en nuestro acervo o ha sido movido a una sección restringida."
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-backwards">
      {/* Navigation & Header Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white hover:bg-white/5 group border border-transparent hover:border-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al Acervo
        </Button>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
        {/* Left Column: Book Cover & Primary Actions */}
        <div className="space-y-8">
          <div className="group relative aspect-[3/4.5] bg-[#0b1120] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 animate-in zoom-in-95 duration-1000">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 bg-[linear-gradient(45deg,#0b1120_25%,#0f172a_25%,#0f172a_50%,#0b1120_50%,#0b1120_75%,#0f172a_75%,#0f172a_100%)] bg-size-[20px_20px]">
                <BookOpen className="w-20 h-20 mb-4 opacity-10" />
                <span className="text-sm font-black uppercase tracking-[0.3em] opacity-40 italic font-serif">
                  In Absentia
                </span>
              </div>
            )}
            {/* Elegant overlay line */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-linear-to-r from-transparent via-[#b59a5d] to-transparent" />
          </div>

          <Button
            onClick={handleReadClick}
            className="w-full h-16 bg-[#b59a5d] hover:bg-[#c6a96e] text-[#0b1120] font-black text-xl rounded-2xl shadow-[0_15px_35px_rgba(181,154,93,0.3)] transition-all hover:translate-y-[-4px] active:translate-y-0 active:scale-95 flex items-center justify-center gap-3 group"
          >
            <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Comenzar Lectura
          </Button>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2 animate-in slide-in-from-left-4 duration-700 delay-200 fill-mode-backwards">
                <span className="px-4 py-1.5 bg-[#b59a5d]/10 text-[#b59a5d] rounded-full text-xs font-black uppercase tracking-widest border border-[#b59a5d]/30 flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {book.category?.name}
                </span>
                <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest ml-auto">
                  Ref. {book.id.slice(0, 12)}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none animate-in slide-in-from-left-6 duration-700 delay-300 fill-mode-backwards">
                {book.title}
              </h1>
              <div className="flex items-center gap-3 text-[#b59a5d] animate-in slide-in-from-left-8 duration-700 delay-400 fill-mode-backwards">
                <div className="p-2 bg-[#b59a5d]/10 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-xl md:text-2xl font-serif italic tracking-tight">
                  {book.author}
                </p>
              </div>
            </div>

            {/* Book Rating Stars */}
            <div className="animate-in fade-in duration-700 delay-500 fill-mode-backwards">
              <RatingStars bookId={book.id} />
            </div>

            <div className="h-0.5 w-full bg-linear-to-r from-white/10 via-white/5 to-transparent rounded-full animate-in scale-x-0 origin-left duration-1000 delay-500 fill-mode-backwards" />
          </div>

          <div className="space-y-6 animate-in fade-in duration-700 delay-700 fill-mode-backwards">
            <div className="flex items-center gap-3 text-white">
              <div className="w-1.5 h-6 bg-[#b59a5d] rounded-full" />
              <h3 className="font-black uppercase tracking-[0.2em] text-sm">
                Sinopsis del Volumen
              </h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-serif text-justify first-letter:text-5xl first-letter:font-black first-letter:text-[#b59a5d] first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              {book.description ||
                "No se ha proporcionado una descripción detallada para este registro en el archivo bibliográfico actual."}
            </p>
          </div>

          {/* Quick Stats / Meta Info */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-backwards">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
              <Calendar className="w-6 h-6 text-[#b59a5d]" />
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
                  Registrado
                </p>
                <p className="text-white font-bold">
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
              <Hash className="w-6 h-6 text-[#b59a5d]" />
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
                  Repositorio
                </p>
                <p className="text-white font-bold">DIGI-ARC-V1</p>
              </div>
            </div>

            <div className="hidden lg:flex p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors col-span-2 lg:col-span-1 items-start flex-col justify-center">
              <Bookmark className="w-6 h-6 text-[#b59a5d]" />
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
                  Estado
                </p>
                <p className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Disponible para Lectura
                </p>
              </div>
            </div>
          </div>

          {/* Agora of Opinions (Reviews) */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1200 fill-mode-backwards">
            <ReviewSection bookId={book.id} />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      {/* <div className="pt-20 text-center opacity-30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-slate-100" />
          <FileText className="w-5 h-5" />
          <div className="h-px w-12 bg-slate-100" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">
          Ex Libris Digitalis
        </p>
      </div> */}
    </div>
  );
};

export default BookDetailPage;
