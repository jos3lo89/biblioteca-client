export interface DashboardStatsResponse {
  users: Users;
  periods: Periods;
  enrollments: Enrollments;
  books: Books;
  categories: Categories;
  engagement: Engagement;
}

export interface Users {
  total: number;
  students: number;
  admins: number;
  active: number;
  inactive: number;
}

export interface Periods {
  total: number;
  current: Current;
}

export interface Current {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  enrollmentsCount: number;
}

export interface Enrollments {
  total: number;
  currentPeriod: number;
  withAccess: number;
  withoutAccess: number;
  recent: Recent[];
}

export interface Recent {
  id: string;
  student: string;
  dni: string;
  period: string;
  canAccess: boolean;
  enrolledAt: string;
}

export interface Books {
  total: number;
  downloadable: number;
  notDownloadable: number;
}

export interface Categories {
  total: number;
  withBooks: WithBook[];
}

export interface WithBook {
  id: string;
  name: string;
  booksCount: number;
}

export interface Engagement {
  totalReviews: number;
  totalRatings: number;
  averageRating: number;
  topRatedBooks: TopRatedBook[];
}

export interface TopRatedBook {
  id: string;
  title: string;
  author: string;
  averageRating: number;
  ratingsCount: number;
}
