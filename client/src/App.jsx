import React, { useState } from 'react';
import NavBar from './components/Navbar.jsx';
import MovieContent from './components/MovieContent.jsx';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [isSharing, setIsSharing] = useState(false);
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <div className='container'>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsSharing={setIsSharing} />
        <hr />
        <MovieContent loggedIn={loggedIn} isSharing={isSharing} movies={movies} setMovies={setMovies} setIsSharing={setIsSharing} />
      </div>
    </div>
  );
}

export default App;
