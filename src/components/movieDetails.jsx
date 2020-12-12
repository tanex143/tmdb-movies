import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const MovieDetails = ({ onClickMovieID, setIsLoading, isLoading }) => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieVideo, setMovieVideo] = useState([]);

  const youtubeURL = `https://www.youtube.com/watch?v=`;

  useEffect(() => {
    async function dataFetch() {
      const { data: movieData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const { data: video } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovieInfo(movieData);
      console.log('movie selected', movieData);
      setMovieVideo(video.results);
      console.log('this is video', video.results);
      setIsLoading(!isLoading);
    }
    dataFetch();
  }, [onClickMovieID]);

  const starRating = () => {
    const stars = [];
    const rating = Math.floor(movieInfo.vote_average);

    for (let i = 1; i <= 10; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon icon={solidStar} key={i} alt='star' />);
      } else {
        stars.push(<FontAwesomeIcon icon={regularStar} key={i} alt='star' />);
      }
    }

    return stars;
  };

  return (
    <>
      {!isLoading && (
        <div>
          <div className='container mx-auto'>
            {movieVideo.length < 1 ? (
              <h1>Trailer is not available</h1>
            ) : (
              <div className='w-full'>
                <ReactPlayer
                  url={youtubeURL + movieVideo[0].key}
                  controls={true}
                  className='modal-w-full'
                />
              </div>
            )}
            <div className='grid grid-cols-10 py-5 gap-4'>
              <div className='col-span-3 col-start-1'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
                  alt='img'
                  className='w-full h-72 rounded'
                />
              </div>
              <div className='col-span-7 col-start-4'>
                <div className='flex gap-1 text-2xl font-semibold'>
                  <h1>{movieInfo.title || movieInfo.original_title}</h1>
                  <p>({movieInfo.release_date.split('-')[0]})</p>
                </div>
                <div className='flex gap-1 text-lg py-1'>
                  <h1>Genre:</h1>
                  <div className='flex gap-3 text-base align-middle'>
                    {movieInfo.genres.map((genre) => (
                      <p key={genre.id} className='px-2 border rounded-full'>
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className='text-lg'>Rating: {movieInfo.vote_average}</p>
                  <div className='flex gap-1'>{starRating()}</div>
                </div>
                <div className='py-3'>
                  <p className='font-semibold'>Overview</p>
                  <p className='italic py-1'>{movieInfo.overview}</p>
                </div>
                <div className='flex gap-5 pt-4'>
                  <p>Movie Length: {movieInfo.runtime}mins</p>
                  <p>Status: {movieInfo.status}</p>
                  <a href={movieInfo.homepage}>{movieInfo.homepage}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
