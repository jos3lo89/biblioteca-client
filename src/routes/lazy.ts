import { lazy } from "react";

export const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
export const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
export const BooksPage = lazy(() => import("@/features/books/page/BooksPage"));
export const BookDetailPage = lazy(
  () => import("@/features/books/page/BookDetailPage"),
);

export const BookReadingPage = lazy(
  () => import("@/features/books/page/BookReadingPage"),
);
export const ProfilePage = lazy(
  () => import("@/features/user/pages/ProfilePage"),
);

export const UserRegisterPage = lazy(
  () => import("@/features/user/pages/UserRegisterPage"),
);
export const CreatedCategoryPage = lazy(
  () => import("@/features/category/pages/CreatedCategoryPage"),
);
