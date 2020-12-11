import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NowPlaying = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotalPage, setPopularTotalPage] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${popularPage}`
      );
      setPopularMovieData(data.results);
      setPopularTotalPage(data.total_pages);
      console.log('Popular', data);
    }
    dataFetch();
  }, [popularPage]);

  return (
    <div className='py-14'>
      <div className='container mx-auto'>
        <h1 className='text-3xl italic font-semibold pb-8'>
          Now Playing in Cinema's
        </h1>
        <div className='p-5 rounded bg-white flex overflow-x-auto gap-5'>
          {popularMovieData.map((movie) => (
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
          ))}
        </div>
        <div className='pt-8'>
          <div className='flex gap-5 justify-center'>
            {popularPage > 1 && (
              <button
                onClick={(e) => setPopularPage(popularPage - 1)}
                className='text-lg border rounded py-1 px-4 focus:outline-none hover:bg-gray-400'
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className='pr-2 text-2xl align-middle'
                />
                Prev
              </button>
            )}

            <p className='text-lg h-full my-auto'>
              Page {popularPage} of {popularTotalPage}
            </p>

            {popularPage !== popularTotalPage && (
              <button
                onClick={(e) => setPopularPage(popularPage + 1)}
                className='text-lg border rounded py-1 px-4 focus:outline-none hover:bg-gray-400'
              >
                Next
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className='pr-2 text-2xl align-middle'
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
