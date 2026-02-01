import AuthLayout from "@/layouts/AuthLayout";
import { createBrowserRouter } from "react-router-dom";
import {
  BookDetailPage,
  BookReadingPage,
  BooksPage,
  DashboardPage,
  LoginPage,
} from "./lazy";
import AdminLayout from "@/layouts/AdminLayout";
import StudentLayout from "@/layouts/StudentLayout";
import AuthGuard from "@/guards/AuthGuard";
import NotFound from "@/components/common/NotFound";

export const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <StudentLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <BooksPage />,
      },
      {
        path: "/book/:id",
        element: <BookDetailPage />,
      },
      {
        path: "/book/:id/reading",
        element: <BookReadingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
