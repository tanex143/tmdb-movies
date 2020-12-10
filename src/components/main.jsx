import { Carousel } from 'antd';
import pics from '../doctorstrange.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  return (
    <div className=''>
      <div className='container mx-auto relative overflow-hidden'>
        <Carousel
          dotPosition='left'
          autoplay
          easing='linear'
          className='w-full opacity-75'
        >
          <div>
            <h3 className='h-50vh text-center'>
              <img src={pics} alt='img' className='w-full' />
            </h3>
          </div>
          <div>
            <h3 className='h-50vh text-center'>
              <img src={pics} alt='img' className='w-full' />
            </h3>
          </div>
          <div>
            <h3 className='h-50vh text-center'>
              <img src={pics} alt='img' className='w-full' />
            </h3>
          </div>
          <div>
            <h3 className='h-50vh text-center'>
              <img src={pics} alt='img' className='w-full' />
            </h3>
          </div>
        </Carousel>

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
