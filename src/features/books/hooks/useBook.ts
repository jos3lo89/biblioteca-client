import { useQuery } from "@tanstack/react-query";
import { bookService } from "../services/book.service";

export const useBook = () => {
  const listBooks = useQuery({
    queryKey: ["list", "books"],
    queryFn: bookService.getAllBooks,
  });

  return { listBooks };
};
