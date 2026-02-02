import http from "@/config/axios";
import type { Review, CreateReviewDto } from "../interfaces/review.interface";

export const reviewService = {
  getReviewsByBook: async (bookId: string): Promise<Review[]> => {
    const { data } = await http.get<Review[]>(`/reviews/${bookId}/books`);
    return data;
  },

  createReview: async (
    bookId: string,
    dto: CreateReviewDto,
  ): Promise<Review> => {
    const { data } = await http.post<Review>(`/reviews/${bookId}/books`, dto);
    return data;
  },

  deleteReview: async (id: string): Promise<{ message: string }> => {
    const { data } = await http.delete<{ message: string }>(`/reviews/${id}`);
    return data;
  },
};
