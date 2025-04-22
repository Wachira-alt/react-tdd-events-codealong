// __tests__/App.test.js
import '@testing-library/jest-dom'; // Ensure this import is present
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Make sure this import is correct
import App from '../App';

// Test: Pizza checkbox is initially unchecked
test("pizza checkbox is initially unchecked", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked(); // Now this should work after importing jest-dom
});

// Test: Toppings list contains only cheese initially
test("toppings list initially contains only cheese", () => {
  render(<App />);

  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getByText("Cheese")).toBeInTheDocument(); // Ensure jest-dom is imported
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

// Test: Checkbox appears as checked when user clicks it
test("checkbox appears as checked when user clicks it", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked(); // Now this should work after importing jest-dom
});

// Test: Topping appears in toppings list when checked
test("topping appears in toppings list when checked", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni); // Add pepperoni
  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument(); // Ensure jest-dom is imported
});

// Test: Topping disappears when unchecked
test("selected topping disappears when checked a second time", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni); // Add pepperoni
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  userEvent.click(addPepperoni); // Remove pepperoni
  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
