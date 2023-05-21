import React, { useState, useEffect } from 'react';
import NavBar from './components/Navbar.jsx';
import MovieContent from './components/MovieContent.jsx';
import BannerNotification from './components/BannerNotification.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { establishConnection } from "./utils/actionCable.js"


function App() {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [isSharing, setIsSharing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cable = establishConnection();

    const channel = cable.subscriptions.create('NotificationChannel', {
      connected() {
        console.log('Connected to Action Cable');
      },
      disconnected() {
        console.log('Disconnected from Action Cable');
      },
      received(data) {
        handleShowNotification(data);
        console.log('Received data:', data);
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleShowNotification = (data) => {
    const message = `User ${data.user.email} just shared video '${data.title}'`;
    setMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="App">
      <div className='container'>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsSharing={setIsSharing} />
        <hr />
        {showNotification && (
          <BannerNotification message={message} type="success" />
        )}
        <MovieContent loggedIn={loggedIn} isSharing={isSharing} movies={movies} setMovies={setMovies} setIsSharing={setIsSharing} />
      </div>
    </div>
  );
}

export default App;
