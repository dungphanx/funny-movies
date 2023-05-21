import React, { useState } from 'react';
import handleRequest from '../utils/HandleRequest';

function NavBar({ loggedIn, setLoggedIn, setIsSharing }) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return alert('Email and password are required!');

    try {
      const response = await handleRequest('POST', 'login', { email, password });

      setLoggedIn(true);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', email);
    } catch (error) {
      if (error.message) {
        alert(error.message);
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setEmail('');
    setPassword('');
  };
  
  const handleShareMovie = async () => {
    setIsSharing(true);
  }

  return (
    <nav className="navbar bg-body-tertiary d-flex items-center justify-between">
      <div className="fs-1 fw-bold">Funny Movies</div>
      {!loggedIn ? (
        <div className="d-flex items-center align-items-stretch gap-2">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 px-2 py-1 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 px-2 py-1 rounded"
          />
          <button
            onClick={handleLogin}
            className="btn btn-sm btn-primary"
          >
            Login / Register
          </button>
        </div>
      ) : (
          <div className="d-flex items-center align-items-center gap-2">
            <span>Hi, { email }</span>
            <button
              className="btn btn-sm btn-success"
              onClick={handleShareMovie}
            >
              Share a movie
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-danger"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
  )
}

export default NavBar;