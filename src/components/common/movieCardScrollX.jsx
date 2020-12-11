const MovieCardScrollX = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className='w-force bg-white overflow-hidden rounded shadow-lg transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out'
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          movie.poster_path || movie.backdrop_path
        }`}
        alt='img'
        className='w-full h-64'
      />
      <div className='mx-1 py-1'>
        <h1 className='font-semibold truncate'>
          {movie.title || movie.original_title || movie.name}
        </h1>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </div>
  );
};

export default MovieCardScrollX;
