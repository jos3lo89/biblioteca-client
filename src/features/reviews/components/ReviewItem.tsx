import { useState } from "react";
import type { Review } from "../interfaces/review.interface";
import { useAuthStore } from "@/stores/auth.store";
import { useReview } from "../hooks/useReview";
import { MessageSquare, Trash2, CornerDownRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewForm from "./ReviewForm";
import { cn } from "@/lib/utils";

interface ReviewItemProps {
  review: Review;
  bookId: string;
  depth?: number;
}

const ReviewItem = ({ review, bookId, depth = 0 }: ReviewItemProps) => {
  const { user } = useAuthStore();
  const { deleteReview } = useReview(bookId);
  const [isReplying, setIsReplying] = useState(false);

  const isOwner = user?.id === review.userId;
  const isReply = depth > 0;

  const handleDelete = () => {
    deleteReview.mutate(review.id);
  };

  return (
    <div className={cn("space-y-4", isReply && "ml-4 md:ml-12")}>
      <div className="group relative bg-white/2 backdrop-blur-sm border border-white/5 rounded-[2rem] p-6 hover:bg-white/5 transition-all duration-300">
        {/* Connection node for replies */}
        {isReply && (
          <div className="absolute -left-6 top-10 w-6 h-px bg-white/10" />
        )}

        <div className="flex items-start gap-4">
          {/* Avatar / Initials */}
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#b59a5d]/10 border border-[#b59a5d]/20 flex items-center justify-center text-[#b59a5d] font-black text-sm shadow-inner group-hover:scale-110 transition-transform">
            {review.initials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Review Header */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <span className="text-white font-bold tracking-tight">
                  {review.userName} {review.userLastName}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                  <Clock className="w-3 h-3" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isOwner && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    disabled={deleteReview.isPending}
                    className="h-9 w-9 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                {depth < 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsReplying(!isReplying)}
                    className={cn(
                      "h-9 w-9 rounded-xl transition-all",
                      isReplying
                        ? "text-[#b59a5d] bg-[#b59a5d]/10"
                        : "text-slate-500 hover:text-[#b59a5d] hover:bg-[#b59a5d]/10",
                    )}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Content */}
            <p className="text-slate-300 leading-relaxed font-serif italic text-lg whitespace-pre-wrap">
              {review.content}
            </p>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-12 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 text-[#b59a5d] mb-2">
            <CornerDownRight className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Respondiendo a {review.userName}
            </span>
          </div>
          <ReviewForm
            bookId={bookId}
            parentId={review.id}
            onSuccess={() => setIsReplying(false)}
            placeholder="Escribe tu respuesta..."
            className="mb-8"
          />
        </div>
      )}

      {/* Nested Children (Replies) */}
      {review.children && review.children.length > 0 && (
        <div className="space-y-4 relative">
          {/* Vertical threading line */}
          <div className="absolute left-6 top-0 bottom-10 w-px bg-white/5" />

          {review.children.map((child) => (
            <ReviewItem
              key={child.id}
              review={child}
              bookId={bookId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
