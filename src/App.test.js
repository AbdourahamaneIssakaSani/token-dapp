import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Page correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Token DApp/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Account 1 correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Account 1/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Account 2 correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Account 2/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Address correctly", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Address:/i);
  expect(linkElements.length).toBe(2); // Check if there are two Address elements
});

test("renders Balance correctly", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Balance:/i);
  expect(linkElements.length).toBe(2); // Check if there are two Balance elements
});

test("renders Transfer button correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/Transfer/i);
  expect(linkElement).toBeInTheDocument();
});
