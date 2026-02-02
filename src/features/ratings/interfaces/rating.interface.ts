export interface RatingResponse {
  action: "created" | "updated" | "removed";
  rating: number | null;
}

export interface RatingSummary {
  average: number;
  total: number;
}

export interface CreateRatingDto {
  rating: number;
}
