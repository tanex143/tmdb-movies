import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TrendingMovies = () => {
  const [trendMovieData, setTrendMovieData] = useState([]);
  const [trendPage, setTrendPage] = useState(1);
  const [trendTotalPage, setTrendTotalPage] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${trendPage}`
      );
      setTrendMovieData(data.results);
      setTrendTotalPage(data.total_pages);
      console.log(data);
    }
    dataFetch();
  }, [trendPage]);

  return (
    <div className='py-14'>
      <div className='container mx-auto'>
        <h1 className='text-3xl italic font-semibold pb-8'>Trending Movies</h1>
        <div className='grid grid-cols-4 xl:grid-cols-5 gap-5'>
          {trendMovieData.map((movie) => (
            <div
              key={movie.id}
              className='w-60 test-glass rounded overflow-hidden shadow-lg transform hover:-translate-y-3 cursor-pointer transition-all duration-500 ease-out'
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt='img'
                className='w-full h-64'
              />
              <div className='mx-1 py-1'>
                <h1 className='font-semibold truncate'>
                  {movie.original_title || movie.title || movie.name}
                </h1>
                <p>{movie.release_date || movie.first_air_date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='pt-8'>
          <div className='flex gap-5 justify-center'>
            {trendPage > 1 && (
              <button
                onClick={(e) => setTrendPage(trendPage - 1)}
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
              Page {trendPage} of {trendTotalPage}
            </p>

            <button
              onClick={(e) => setTrendPage(trendPage + 1)}
              className='text-lg border rounded py-1 px-4 focus:outline-none hover:bg-gray-400'
            >
              Next
              <FontAwesomeIcon
                icon={faArrowRight}
                className='pr-2 text-2xl align-middle'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
