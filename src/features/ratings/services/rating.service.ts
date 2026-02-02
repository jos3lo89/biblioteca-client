import http from "@/config/axios";
import type {
  RatingResponse,
  RatingSummary,
  CreateRatingDto,
} from "../interfaces/rating.interface";

export const ratingService = {
  rateBook: async (
    bookId: string,
    dto: CreateRatingDto,
  ): Promise<RatingResponse> => {
    const { data } = await http.post<RatingResponse>(
      `/ratings/${bookId}/books`,
      dto,
    );
    return data;
  },

  getMyRating: async (bookId: string): Promise<{ rating: number | null }> => {
    const { data } = await http.get<{ rating: number | null }>(
      `/ratings/${bookId}/my-rating`,
    );
    return data;
  },

  getSummary: async (bookId: string): Promise<RatingSummary> => {
    const { data } = await http.get<RatingSummary>(
      `/ratings/${bookId}/summary`,
    );
    return data;
  },
};
