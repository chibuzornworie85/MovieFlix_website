import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


test("renders the app component", () => {
  render(<App />);
  const bodyCom = screen.getByTestId("hello");
  expect(bodyCom).toBeInTheDocument();
});