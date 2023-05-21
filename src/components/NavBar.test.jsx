import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar.jsx';

describe('NavBar component', () => {
  window.alert = jest.fn();

  it('renders login inputs when not logged in', () => {
    render(<NavBar loggedIn={false} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login / Register' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('renders user info and buttons when logged in', () => {
    localStorage.setItem('email', 'test@example.com');
    render(<NavBar loggedIn={true} />);

    const userInfo = screen.getByText(/Hi, .*/);
    const shareButton = screen.getByRole('button', { name: 'Share a movie' });
    const logoutButton = screen.getByRole('button', { name: 'Logout' });

    expect(userInfo).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
