import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster closeButton richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
