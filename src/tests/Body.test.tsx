import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Body from "../components/Body";
import { QueryClient, QueryClientProvider } from "react-query";
import { axiosMock } from "../__mocks__/axios";

test("renders the component and performs search", () => {
    axiosMock.get.mockResolvedValueOnce({ 
        data: [
            { id: 1, title: "Batman Begins", releaseYear: 2005 },
            { id: 2, title: "The Dark Knight", releaseYear: 2008 },
          ],
     });
  render(<Body />);
  const search = screen.getByText("Loading...");
  expect(search).toBeInTheDocument();
});

test("renders the search section", () => {
  render(<Body />);
  const bodyComponent = screen.getByTestId("search-section");
  expect(bodyComponent).toBeInTheDocument();
});

test("renders the component and performs the search", () => {
  render(<Body />);
  fireEvent.change(screen.getByPlaceholderText("Search movies..."), {
    target: { value: "Batman" },
  });
  fireEvent.click(screen.getByText("Search"));
});

test("renders search after inputing text in inputfiled", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
  const component = screen.getByText("Search");
  await waitFor(() => expect(component).toBeInTheDocument());
});