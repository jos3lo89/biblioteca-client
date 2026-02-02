import { useForm } from "react-hook-form";
import { Send, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReview } from "../hooks/useReview";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  bookId: string;
  parentId?: string;
  onSuccess?: () => void;
  placeholder?: string;
  className?: string;
}

const ReviewForm = ({
  bookId,
  parentId,
  onSuccess,
  placeholder = "Escribe tu comentario...",
  className,
}: ReviewFormProps) => {
  const { createReview } = useReview(bookId);
  const { register, handleSubmit, reset, watch } = useForm<{ content: string }>(
    {
      defaultValues: { content: "" },
    },
  );

  const content = watch("content");

  const onSubmit = (data: { content: string }) => {
    if (!data.content.trim()) return;
    createReview.mutate(
      { content: data.content, parentId },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("relative space-y-4", className)}
    >
      <div className="relative group">
        <textarea
          {...register("content")}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder={placeholder}
          className="w-full min-h-[120px] p-6 bg-[#0d1627]/50 backdrop-blur-xl border border-white/10 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#b59a5d]/30 focus:border-[#b59a5d]/50 transition-all rounded-[1.5rem] outline-none resize-none font-serif text-lg leading-relaxed shadow-inner"
        />

        {/* Elegant limit indicator or something similar could go here */}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => reset()}
          disabled={!content || createReview.isPending}
          className="h-11 px-6 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5"
        >
          <Eraser className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
        <Button
          type="submit"
          disabled={!content.trim() || createReview.isPending}
          className="h-11 px-8 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-lg shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {parentId ? "Responder" : "Publicar"}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
