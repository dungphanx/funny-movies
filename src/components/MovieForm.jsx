import React, { useState } from 'react';
import handleRequest from '../utils/HandleRequest';

function MovieForm({ setIsSharing }) {
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleInputChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleShareClick = async () => {
    try {
      await handleRequest('POST', 'movies', { movie: { link: youtubeLink } });
      setIsSharing(false)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
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