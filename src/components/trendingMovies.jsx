import pics from '../doctorstrange.jpg';

const TrendingMovies = () => {
  return (
    <div className='py-14'>
      <div className='container mx-auto'>
        <h1 className='text-3xl italic font-semibold pb-8'>Trending Movies</h1>
        <div>
          <div className='w-52 bg-white rounded overflow-hidden shadow-lg'>
            <img src={pics} alt='pic' className='w-full h-64' />
            <div className='mx-1'>
              <h1 className='font-semibold text-lg'>Doctor Strange</h1>
              <p>2017</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
