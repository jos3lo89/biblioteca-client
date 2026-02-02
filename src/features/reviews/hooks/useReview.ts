import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "../services/review.service";
import type { CreateReviewDto } from "../interfaces/review.interface";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useReview = (bookId?: string) => {
  const queryClient = useQueryClient();

  const listReviews = () => {
    return useQuery({
      queryKey: ["reviews", bookId],
      queryFn: () =>
        bookId ? reviewService.getReviewsByBook(bookId) : Promise.resolve([]),
      enabled: !!bookId,
    });
  };

  const createReview = useMutation({
    mutationFn: (dto: CreateReviewDto) => {
      if (!bookId) throw new Error("Book ID is required");
      return reviewService.createReview(bookId, dto);
    },
    onSuccess: () => {
      toast.success("Comentario enviado");
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Error al enviar comentario",
        );
      }
    },
  });

  const deleteReview = useMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),
    onSuccess: () => {
      toast.success("Comentario eliminado");
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "No tienes permiso para eliminar este comentario",
        );
      }
    },
  });

  return {
    listReviews,
    createReview,
    deleteReview,
  };
};
