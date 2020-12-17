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
          <h1 className='text-3xl italic font-semibold pb-8'>{name}</h1>
          <div className='grid grid-cols-4 xl:grid-cols-5 gap-5'>
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

              <p className='text-lg h-full my-auto'>
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
