import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders Funny Movies', () => {
  render(<App />);
  const linkElement = screen.getByText(/funny movies/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Login', () => {
  render(<App />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});