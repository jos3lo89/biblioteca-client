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
  () => import("@/features/user/pages/UsersAdminPage"),
);
export const CategoryCreatePage = lazy(
  () => import("@/features/category/pages/CreatedCategoryPage"),
);
export const ListCategoriesPage = lazy(
  () => import("@/features/category/pages/ListCategoriesPage"),
);

export const PeriodsPage = lazy(
  () => import("@/features/periods/pages/PeriodsPages"),
);

export const StudentsPage = lazy(
  () => import("@/features/user/pages/StudentsPage"),
);

export const StudentRegisterPage = lazy(
  () => import("@/features/user/pages/StudentRegisterPage"),
);

export const ListBooksPage = lazy(
  () => import("@/features/books/page/ListBooksPage"),
);

export const BookCreatePage = lazy(
  () => import("@/features/books/page/BookCreatePage"),
);
