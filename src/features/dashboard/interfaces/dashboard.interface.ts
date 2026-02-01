export interface DashboardStatsResponse {
  users: Users;
  books: Books;
  periods: Periods;
  categories: Categories;
}

export interface Users {
  students: number;
}

export interface Books {
  total: number;
}

export interface Periods {
  total: number;
  current: Current;
}

export interface Current {
  name: string;
  enrollmentsCount: number;
}

export interface Categories {
  total: number;
}
