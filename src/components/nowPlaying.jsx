import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCardScrollX from './common/movieCardScrollX';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';

const NowPlaying = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popularTotalPage, setPopularTotalPage] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );
      setPopularMovieData(data.results);
      setPopularTotalPage(data.total_pages);
      console.log('Popular', data);
    }
    dataFetch();
  }, [currentPage]);

  return (
    <div className='py-14'>
      <div className='container mx-auto'>
        <h1 className='text-3xl italic font-semibold pb-8'>
          Now Playing in Cinema's
        </h1>
        <div className='p-5 rounded bg-white flex overflow-x-auto gap-5'>
          {popularMovieData.map((movie) => (
            <MovieCardScrollX key={movie.id} movie={movie} />
          ))}
        </div>
        <div className='pt-8'>
          <div className='flex gap-5 justify-center'>
            {currentPage > 1 && (
              <PrevButton
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}

            <p className='text-lg h-full my-auto'>
              Page {currentPage} of {popularTotalPage}
            </p>

            {currentPage !== popularTotalPage && (
              <NextButton
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
