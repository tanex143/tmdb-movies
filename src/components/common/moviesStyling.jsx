import MovieCard from './movieCard';
import PrevButton from './prevButton';
import NextButton from './nextButton';

const MoviesStyling = ({
  movieData,
  showModalHandler,
  currentPage,
  setCurrentPage,
  totalPages,
  name,
}) => {
  return (
    <>
      <div className='pb-14'>
        <div className='container mx-auto'>
          <h1 className='md:text-3xl text-xl italic font-semibold pb-8'>
            {name}
          </h1>
          <div className='flex flex-wrap justify-center md:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 gap-5'>
            {movieData.map((movie) => (
              <div key={movie.id} onClick={() => showModalHandler(movie.id)}>
                <MovieCard movie={movie} />
              </div>
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

              <p className='sm:text-lg h-full my-auto'>
                Page {currentPage} of {totalPages}
              </p>

              {currentPage !== totalPages && (
                <NextButton
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesStyling;
