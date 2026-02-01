import { useQuery } from "@tanstack/react-query";
import { bookService } from "../services/book.service";

export const useBook = () => {
  const listBooks = (
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "books", page, limit, search, category],
      queryFn: () => bookService.getAllBooks(page, limit, search, category),
    });
  };

  const getBookById = (id: string) => {
    return useQuery({
      queryKey: ["get", "book", id],
      queryFn: () => bookService.getBookById(id),
    });
  };

  const getBookForReading = (id: string) => {
    return useQuery({
      queryKey: ["get", "book", id, "read"],
      queryFn: () => bookService.getBookForReading(id),
    });
  };
  return { listBooks, getBookById, getBookForReading };
};
