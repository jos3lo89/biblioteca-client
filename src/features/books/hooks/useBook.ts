import { useMutation, useQuery } from "@tanstack/react-query";
import { bookService } from "../services/book.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useBook = () => {
  const queryClient = useQueryClient();

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

  const createBook = useMutation({
    mutationKey: ["create", "book"],
    mutationFn: bookService.createBook,
    onSuccess: () => {
      toast.success("Libro creado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["list", "books"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear el libro");
      }
    },
    onMutate: () => {
      toast.loading("Creando libro...", { id: "create-book" });
    },
    onSettled: () => {
      toast.dismiss("create-book");
    },
  });

  const deleteBook = useMutation({
    mutationKey: ["delete", "book"],
    mutationFn: bookService.deleteBook,
    onSuccess: () => {
      toast.success("Libro eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["list", "books"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al eliminar el libro");
      }
    },
    onMutate: () => {
      toast.loading("Eliminando libro...", { id: "delete-book" });
    },
    onSettled: () => {
      toast.dismiss("delete-book");
    },
  });

  return { listBooks, getBookById, getBookForReading, createBook, deleteBook };
};
