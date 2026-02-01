export interface Book {
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
  category: Category;
  coverUrl: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookForReading {
  url: string;
  expiresAt: string;
}
