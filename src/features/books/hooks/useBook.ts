import { useQuery } from "@tanstack/react-query";
import { bookService } from "../services/book.service";

export const useBook = () => {
  const listBooks = useQuery({
    queryKey: ["list", "books"],
    queryFn: bookService.getAllBooks,
  });

  const getBookById = (id: string) => {
    return useQuery({
      queryKey: ["get", "book", id],
      queryFn: () => bookService.getBookById(id),
    });
  };
  return { listBooks, getBookById };
};
