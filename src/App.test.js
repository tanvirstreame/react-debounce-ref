import { render, screen } from '@testing-library/react';
import App from './App';

test('renders some label', () => {
  render(<App />);
  const searchElement = screen.getByText(/search/i);
  expect(searchElement).toBeInTheDocument();
  const nameElement = screen.getByText(/Name:/i);
  expect(nameElement).toBeInTheDocument();
  const emailElement = screen.getByText(/Email:/i);
  expect(emailElement).toBeInTheDocument();
  const passwordElement = screen.getByText(/Password:/i);
  expect(passwordElement).toBeInTheDocument();
});
