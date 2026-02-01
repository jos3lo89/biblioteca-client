import http from "@/config/axios";
import type {
  BookForReading,
  GetBookByIdResponse,
  ListBooksResponse,
} from "../interfaces/book.interface";

export const bookService = {
  getAllBooks: async (
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ) => {
    const { data } = await http.get<ListBooksResponse>(
      `/books?page=${page}&limit=${limit}&search=${search || ""}&category=${category || ""}`,
    );
    return data;
  },

  getBookById: async (id: string) => {
    const { data } = await http.get<GetBookByIdResponse>(`/books/${id}`);
    return data;
  },

  getBookForReading: async (id: string) => {
    const { data } = await http.get<BookForReading>(`/books/${id}/read`);
    return data;
  },
};
