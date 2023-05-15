import { useEffect } from 'react';
import MovieForm from './MovieForm.jsx';
import MovieList from './MovieList.jsx';
import handleRequest from '../utils/HandleRequest';

function Movie({ loggedIn, isSharing, setIsSharing, movies, setMovies }) {
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await handleRequest('GET', 'movies');
      setMovies(response.data)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div>
      {loggedIn && isSharing ? (
        <MovieForm setIsSharing={setIsSharing} />
      ) : (
        <MovieList movies={movies} />
      )
      }
    </div>
  );
}

export default Movie;