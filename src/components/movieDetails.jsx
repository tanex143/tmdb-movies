import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = ({ onClickMovieID }) => {
  const [movieInfo, setMovieInfo] = useState();
  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovieInfo(data);
      console.log(data);
    }
    dataFetch();
  }, [onClickMovieID]);
  return (
    <div className='bg-gray-300'>
      <div className='container mx-auto'>
        <h1>Movie ID: {onClickMovieID} </h1>
      </div>
    </div>
  );
};

export default MovieDetails;
