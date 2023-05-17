import { render, screen } from '@testing-library/react';
import MovieContent from './MovieContent.jsx'

describe('MovieContent component', () => {
  const movies = [
    { id: 1, description: 'desc 1', user: {email: 'test@example.com'} },
    { id: 2, description: 'desc 2', user: {email: 'test@example.com'} },
  ]

  it('render MovieForm when logged in and sharing', () => {
    const loggedIn = true;
    const isSharing = true;
    const setMovies = jest.fn();

    render(<MovieContent loggedIn={loggedIn} isSharing={isSharing} movies={movies} setMovies={setMovies} />);

    expect(screen.getByText('Share YouTube Link')).toBeInTheDocument();
  });

  it('render MovieList when not sharing', () => {
    const loggedIn = false;
    const isSharing = false;
    const setMovies = jest.fn();

    render(<MovieContent loggedIn={loggedIn} isSharing={isSharing} movies={movies} setMovies={setMovies} />);
    expect(screen.getByText('desc 1')).toBeInTheDocument();
  });
});