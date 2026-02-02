import { useReview } from "../hooks/useReview";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import { MessageSquareText, Loader2 } from "lucide-react";

interface ReviewSectionProps {
  bookId: string;
}

const ReviewSection = ({ bookId }: ReviewSectionProps) => {
  const { listReviews } = useReview(bookId);
  const { data: reviews, isLoading, isError } = listReviews();

  return (
    <div className="space-y-12 py-12">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Ágora de <span className="text-[#b59a5d]">Opiniones</span>
            </h2>
            <p className="text-slate-500 font-serif italic text-sm">
              Comparta su exégesis sobre esta obra con la comunidad académica.
            </p>
          </div>
        </div>
        <div className="h-0.5 w-full bg-linear-to-r from-white/10 via-white/5 to-transparent rounded-full" />
      </div>

      {/* Main Form */}
      <div className="animate-in fade-in duration-700 delay-200">
        <ReviewForm bookId={bookId} />
      </div>

      {/* List Section */}
      <div className="space-y-8 mt-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin opacity-20" />
            <p className="font-serif italic text-lg uppercase tracking-widest text-[10px]">
              Recuperando pergaminos...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-400 font-serif italic">
            Error al recuperar los comentarios del archivo digital.
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} bookId={bookId} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white/1 border border-dashed border-white/5 rounded-[3rem] text-slate-600 gap-4">
            <MessageSquareText className="w-12 h-12 opacity-10" />
            <div className="text-center">
              <p className="font-serif italic text-xl">
                Silencio en la Gran Biblioteca.
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-40">
                Sé el primero en inscribir tu crítica.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
