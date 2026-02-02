export interface ListBooksResponse {
  data: Array<{
    id: string;
    title: string;
    author: string;
    description: string;
    coverKey: string;
    fileKey: string;
    isDownloadable: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
    _count: {
      reviews: number;
      ratings: number;
    };
    coverUrl: string;
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
export interface GetBookByIdResponse {
  id: string;
  title: string;
  author: string;
  description: string;
  coverKey: string;
  fileKey: string;
  isDownloadable: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };

  coverUrl: string;
}

export interface BookForReading {
  url: string;
  expiresAt: string;
}

export interface CreateBookResponse {
  id: string;
  title: string;
  author: string;
  description: string;
  coverKey: string;
  fileKey: string;
  isDownloadable: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  coverUrl: string;
}

export interface DeleteBookResponse {
  message: string;
}
