import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

const Main = () => {
  const [headerData, setHeaderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setHeaderData(data.results.slice(0, 10));
      setIsLoading(false);
    }
    dataFetch();
  }, []);

  return (
    <div className='top-0'>
      <div className='container mx-auto relative overflow-hidden'>
        {!isLoading ? (
          <Carousel
            dotPosition='left'
            autoplay
            easing='linear'
            className='w-full opacity-75'
          >
            {headerData.map((movie) => (
              <div key={movie.id}>
                <h3 className='h-50vh text-center'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt='img'
                    className='w-full'
                  />
                </h3>
              </div>
            ))}
          </Carousel>
        ) : (
          <Spin className='font-4xl' />
        )}

        <div className='absolute top-0 left-0 w-full mt-64'>
          <div className='py-10 max-w-3xl mx-auto rounded glass'>
            <div className='flex flex-col items-center'>
              <h1 className='text-3xl font-semibold pt-3'>
                Welcome to The Movie Database
              </h1>
              <p className='pb-3 italic'>
                Watch movies to relax and grab your popcorn and beer
              </p>
            </div>

            <form className='relative max-w-lg mx-auto'>
              <FontAwesomeIcon
                icon={faSearch}
                className='absolute top-0 left-0 text-xl opacity-80 h-full my-auto ml-1'
              />
              <input
                type='text'
                placeholder='Search movies. . .'
                className='w-4/5 py-1 text-lg focus:outline-none focus:shadow-lg rounded-tl rounded-bl indent'
              />
              <button
                type='submit'
                className='py-1 px-3 text-lg bg-gray-400 rounded-tr rounded-br focus:outline-none focus:bg-gray-600 hover:text-white'
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
