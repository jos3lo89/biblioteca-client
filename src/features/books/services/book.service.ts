import http from "@/config/axios";
import type { Book } from "../interfaces/book.interface";

export const bookService = {
  getAllBooks: async () => {
    const { data } = await http.get<Book[]>("/books");
    return data;
  },

  getBookById: async (id: string) => {
    const { data } = await http.get<Book>(`/books/${id}`);
    return data;
  },
};
