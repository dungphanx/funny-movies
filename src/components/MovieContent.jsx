import { useEffect } from 'react';
import MovieForm from './MovieForm.jsx';
import MovieList from './MovieList.jsx';
import handleRequest from '../utils/HandleRequest';

function MovieContent({ loggedIn, isSharing, setIsSharing, movies, setMovies }) {
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

  const onSharedMovie = (movie) => {
    debugger
    setMovies([...movies, movie].sort((a, b) => b.id - a.id));
  }

  return (
    <div>
      {loggedIn && isSharing ? (
        <MovieForm setIsSharing={setIsSharing} onSharedMovie={onSharedMovie}/>
      ) : (
        <MovieList movies={movies} />
      )
      }
    </div>
  );
}

export default MovieContent;