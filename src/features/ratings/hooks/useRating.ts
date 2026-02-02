import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ratingService } from "../services/rating.service";
import type { CreateRatingDto } from "../interfaces/rating.interface";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useRating = (bookId: string) => {
  const queryClient = useQueryClient();

  const getMyRating = () => {
    return useQuery({
      queryKey: ["my-rating", bookId],
      queryFn: () => ratingService.getMyRating(bookId),
      enabled: !!bookId,
    });
  };

  const getSummary = () => {
    return useQuery({
      queryKey: ["rating-summary", bookId],
      queryFn: () => ratingService.getSummary(bookId),
      enabled: !!bookId,
    });
  };

  const rateBook = useMutation({
    mutationFn: (dto: CreateRatingDto) => ratingService.rateBook(bookId, dto),
    onSuccess: (data) => {
      if (data.action === "created") toast.success("Calificación registrada");
      if (data.action === "updated") toast.success("Calificación actualizada");
      if (data.action === "removed") toast.info("Calificación eliminada");

      queryClient.invalidateQueries({ queryKey: ["my-rating", bookId] });
      queryClient.invalidateQueries({ queryKey: ["rating-summary", bookId] });
      queryClient.invalidateQueries({ queryKey: ["list", "books"] }); // To update global average if shown
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Error al calificar");
      }
    },
  });

  return {
    getMyRating,
    getSummary,
    rateBook,
  };
};
