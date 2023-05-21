import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList component', () => {
  it('renders the list of movies correctly', () => {
    const movies = [
      {
        id: 1,
        uid: 'ABC123',
        title: 'Movie 1',
        user: {
          email: 'user1@example.com',
        },
        like: 10,
        description: 'This is a movie description.',
      },
      {
        id: 2,
        uid: 'DEF456',
        title: 'Movie 2',
        user: {
          email: 'user2@example.com',
        },
        like: 5,
        description: 'This is another movie description.',
      },
    ];

    render(<MovieList movies={movies} />);

    const movieElements = screen.getAllByTestId('movie-item');
    expect(movieElements).toHaveLength(movies.length);

    movies.forEach((movie, index) => {
      const movieElement = movieElements[index];
      const videoElement = movieElement.querySelector('iframe');
      const titleElement = movieElement.querySelector('.fs-5');
      const emailElement = movieElement.querySelector('.fw-lighter');
      const descriptionElement = movieElement.querySelector('.fs-6.fst-italic');

      expect(videoElement).toHaveAttribute('src', `https://www.youtube.com/embed/${movie.uid}?rel=0`);
      expect(titleElement).toHaveTextContent(movie.title);
      expect(emailElement).toHaveTextContent(`Share by: ${movie.user.email} | ${movie.like} likes`);
      expect(descriptionElement).toHaveTextContent(movie.description.slice(0, 150));
    });
  });
});
