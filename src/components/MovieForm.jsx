import React, { useState } from 'react';
import handleRequest from '../utils/HandleRequest';
import { on } from 'events';

function MovieForm({ setIsSharing, onSharedMovie }) {
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleInputChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleShareClick = async () => {
    try {
      const responseData = await handleRequest('POST', 'movies', { movie: { link: youtubeLink } });
      setIsSharing(false)
      onSharedMovie(responseData)
    } catch (error) {
      if (error.message) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 mt-4">
        <h3 className='text-center'>Share YouTube Link</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter YouTube link"
            value={youtubeLink}
            onChange={handleInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShareClick}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;