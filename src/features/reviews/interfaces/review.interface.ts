export interface Review {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userLastName: string;
  initials: string;
  parentId: string | null;
  createdAt: string;
  children: Review[];
}

export interface CreateReviewDto {
  content: string;
  parentId?: string;
}
