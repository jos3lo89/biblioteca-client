export interface CreateCategoryResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesResponse {
  data: Array<{
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    _count: {
      books: number;
    };
  }>;
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface GetAllCategoriesResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    books: number;
  };
}
