import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from './common/movieCard';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';

const UpcomingMovies = () => {
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [upcomingTotalPage, setUpcomingTotalPage] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );
      setUpcomingMovieData(data.results);
      setUpcomingTotalPage(data.total_pages);
      console.log('Upcoming', data);
    }
    dataFetch();
  }, [currentPage]);

  return (
    <div className='pb-14'>
      <div className='container mx-auto'>
        <h1 className='text-3xl italic font-semibold pb-8'>Upcoming Movies</h1>
        <div className='grid grid-cols-4 xl:grid-cols-5 gap-5'>
          {upcomingMovieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
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
              Page {currentPage} of {upcomingTotalPage}
            </p>

            {currentPage !== upcomingTotalPage && (
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

export default UpcomingMovies;
