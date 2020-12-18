import noImage from '../../images/no-image.jpg';
import { motion } from 'framer-motion';
import { useScroll } from './../animation/useScroll';
import { zoomIn } from './../animation/animate';

const MovieCardScrollX = ({ movie }) => {
  const [element, animControls] = useScroll();
  return (
    <motion.div
      ref={element}
      variants={zoomIn}
      initial='hidden'
      animate={animControls}
      key={movie.id}
      className='md:w-60 w-48 bg-white overflow-hidden rounded shadow-lg transform hover:-translate-y-3 hover:shadow-2xl hover:text-black cursor-pointer transition-all duration-500 ease-out'
    >
      {movie.poster_path || movie.backdrop_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${
            movie.poster_path || movie.backdrop_path
          }`}
          alt='img'
          className='w-full h-64'
        />
      ) : (
        <img src={noImage} alt='img' className='w-full h-64' />
      )}
      <div className='mx-1 py-1'>
        <h1 className='font-semibold truncate'>
          {movie.title || movie.original_title || movie.name}
        </h1>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </motion.div>
  );
};

export default MovieCardScrollX;
