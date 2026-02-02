import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRating } from "../hooks/useRating";

interface RatingStarsProps {
  bookId: string;
}

const RatingStars = ({ bookId }: RatingStarsProps) => {
  const { getMyRating, getSummary, rateBook } = useRating(bookId);
  const { data: myRating } = getMyRating();
  const { data: summary } = getSummary();

  const handleRate = (value: number) => {
    rateBook.mutate({ rating: value });
  };

  const currentRating = myRating?.rating || 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            disabled={rateBook.isPending}
            className="group outline-none focus:ring-2 focus:ring-[#b59a5d]/30 rounded-lg p-1 transition-all active:scale-90 disabled:opacity-50"
          >
            <Star
              className={cn(
                "w-7 h-7 transition-all duration-300",
                star <= currentRating
                  ? "fill-[#b59a5d] text-[#b59a5d] drop-shadow-[0_0_8px_rgba(181,154,93,0.5)] scale-110"
                  : "text-slate-600 group-hover:text-[#b59a5d]/50",
              )}
            />
          </button>
        ))}
      </div>
      {summary && (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span className="text-[#b59a5d] text-sm">
            {summary.average.toFixed(1)}
          </span>
          <span>•</span>
          <span>{summary.total} calificaciones</span>
        </div>
      )}
    </div>
  );
};

export default RatingStars;
