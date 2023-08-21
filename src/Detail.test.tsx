import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MovieDetailsPage from "./Component/Detail";
import { QueryClient, QueryClientProvider } from "react-query";

test("renders the invalid movie ID", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
     <MovieDetailsPage />
    </QueryClientProvider>
  );
  const detailComponent = screen.getByText("Invalid movie ID");
  await waitFor(() => expect(detailComponent).toBeInTheDocument());
});
