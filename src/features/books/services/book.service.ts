import http from "@/config/axios";
import type { Book, BookForReading } from "../interfaces/book.interface";

export const bookService = {
  getAllBooks: async () => {
    const { data } = await http.get<Book[]>("/books");
    return data;
  },

  getBookById: async (id: string) => {
    const { data } = await http.get<Book>(`/books/${id}`);
    return data;
  },

  getBookForReading: async (id: string) => {
    const { data } = await http.get<BookForReading>(`/books/${id}/read`);
    return data;
  },
};
