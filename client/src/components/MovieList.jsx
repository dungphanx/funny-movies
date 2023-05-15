function MovieList({ movies }) {
  return (
    <div>
      {
        movies.map((movie) => {
          return (
            <div key={movie.id} className='border d-flex p-2 mt-2'>
              <div className='video'>
                <iframe src={`https://www.youtube.com/embed/${movie.uid}?rel=0`} allowFullScreen title={movie.uid} />
              </div>
              <div className='info text-left ms-2'>
                <div className='fs-5 fw-semibold text-danger-emphasis'>{movie.title}</div>
                <div className='fw-lighter'>Share by: {movie.user.email} | { movie.like || 0 } likes</div>
                <div className='fs-6'>Description:</div>
                <div className='fs-6 fst-italic'>{movie.description.slice(0, 150)}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default MovieList;