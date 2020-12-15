import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import ShowMoreText from 'react-show-more-text';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';
import MovieCardScrollX from './common/movieCardScrollX';
import { Spin } from 'antd';
import UnknownPerson from '../images/unknown-person.png';
import Incognito from '../images/incognito.jpg';
import noImage from '../images/no-image.jpg';

const MovieDetails = ({ onClickMovieID, setIsLoading, isLoading }) => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotalPage, setReviewsTotalPage] = useState(1);
  const [similarMovies, setSimilarMovies] = useState([]);

  const youtubeURL = `https://www.youtube.com/watch?v=`;

  useEffect(() => {
    async function dataFetch() {
      const { data: movieData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const { data: video } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const { data: cast } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const { data: reviews } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}/reviews?api_key=${process.env.REACT_APP_API_KEY}&page=${reviewsPage}`
      );
      const { data: similar } = await axios.get(
        `https://api.themoviedb.org/3/movie/${onClickMovieID}/similar?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovieInfo(movieData);
      console.log('movie selected', movieData);
      setMovieVideo(video.results);
      console.log('this is video', video.results);
      setMovieCast(cast.cast);
      console.log('this is cast', cast);
      setMovieReviews(reviews.results);
      setReviewsTotalPage(reviews.total_pages);
      console.log('this is reviews', reviews);
      setSimilarMovies(similar.results);
      console.log('this is similar movies', similar);
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

  const reviewsRating = (rate) => {
    const stars = [];
    const rating = Math.floor(rate);

    for (let i = 1; i <= 10; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon icon={solidStar} key={i} alt='star' />);
      } else {
        stars.push(<FontAwesomeIcon icon={regularStar} key={i} alt='star' />);
      }
    }

    return stars;
  };

  const userImgChecker = (img) => {
    if (img.includes('https')) {
      return (
        <img src={Incognito} alt='img' className='w-4/5 rounded-full mx-auto' />
      );
    } else {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w500${img}`}
          alt='img'
          className='w-4/5 rounded-full mx-auto'
        />
      );
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className='ant-modal-wrap ant-modal-body'>
          <div className='container mx-auto'>
            {movieVideo.length < 1 ? (
              <h1 className='italic text-lg text-center h-20'>
                Trailer is not yet available
              </h1>
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
                {movieInfo.poster_path !== null ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
                    alt='img'
                    className='w-full h-72 rounded'
                  />
                ) : (
                  <img
                    src={noImage}
                    alt='img'
                    className='w-full h-72 rounded'
                  />
                )}
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
                      <p
                        key={genre.id}
                        className='px-2 py-0 border rounded-full'
                      >
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
                  {movieInfo.overview.length < 1 ? (
                    <h1 className='italic py-1'>Ongoing.</h1>
                  ) : (
                    <p className='italic py-1'>{movieInfo.overview}</p>
                  )}
                </div>
                <div className='flex gap-5 pt-4'>
                  <p>
                    Movie Length:{' '}
                    <span className='italic'>{movieInfo.runtime}mins</span>
                  </p>
                  <p>
                    Status: <span className='italic'>{movieInfo.status}</span>
                  </p>
                  <a href={movieInfo.homepage}>{movieInfo.homepage}</a>
                </div>
              </div>
            </div>
            <div className='border rounded'>
              <h1 className='font-semibold text-xl text-center pt-5'>Cast</h1>
              <div className='flex overflow-x-auto py-3'>
                {movieCast.map((eachCast) => (
                  <div key={eachCast.id} className='overflow-hidden minw-12'>
                    {eachCast.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${eachCast.profile_path}`}
                        alt='img'
                        className='w-4/6 mx-auto h-32 rounded-full border'
                      />
                    ) : (
                      <img
                        src={UnknownPerson}
                        alt='img'
                        className='w-4/6 mx-auto h-32 rounded-full border'
                      />
                    )}

                    <div className='text-center py-2'>
                      <h1 className='font-semibold'>{eachCast.name}</h1>
                      <p>{eachCast.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='py-8'>
              <h1 className='font-semibold text-xl text-center pt-5'>
                Reviews and Comments
              </h1>
              <div>
                {movieReviews.length < 1 ? (
                  <h1 className='text-center italic py-3'>
                    No Reviews and Comments Yet
                  </h1>
                ) : (
                  movieReviews.map((review) => (
                    <div
                      key={review.id}
                      className='grid grid-cols-8 py-5 gap-5'
                    >
                      <div className='col-start-1'>
                        <span>
                          {review.author_details.avatar_path !== null ? (
                            userImgChecker(review.author_details.avatar_path)
                          ) : (
                            <img
                              src={Incognito}
                              alt='img'
                              className='w-4/5 rounded-full mx-auto'
                            />
                          )}
                        </span>
                      </div>
                      <div className='col-start-2 col-span-7'>
                        <h1 className='font-semibold text-lg'>
                          {review.author}
                        </h1>
                        <p>
                          Rating:
                          <span className='ml-1'>
                            {reviewsRating(review.author_details.rating)}
                          </span>
                        </p>
                        <p className='italic'>Posted on: {review.created_at}</p>

                        {/*/////////////////////// Show more text library ///////////////////////*/}
                        <ShowMoreText
                          more='Show more'
                          less='Show less'
                          className='py-3'
                          expanded={false}
                        >
                          {review.content}
                        </ShowMoreText>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className='flex gap-5 justify-center'>
                {reviewsPage !== 1 && (
                  <PrevButton
                    currentPage={reviewsPage}
                    setCurrentPage={setReviewsPage}
                  />
                )}

                {reviewsTotalPage < 1 ? (
                  ''
                ) : (
                  <p className='h-full my-auto'>
                    Page {reviewsPage} of {reviewsTotalPage}
                  </p>
                )}
                {reviewsPage !== reviewsTotalPage && reviewsPage === 0 && (
                  <NextButton
                    currentPage={reviewsPage}
                    setCurrentPage={setReviewsPage}
                  />
                )}
              </div>
              <div className='pt-5'>
                <h1 className='py-1 font-semibold text-lg'>Similar Movies</h1>
                <div className='p-5 border rounded bg-white flex overflow-x-auto gap-5'>
                  {similarMovies.length < 1 ? (
                    <h1 className='italic h-full my-auto'>
                      No Similar Movies Yet. Ongoing To Find.
                    </h1>
                  ) : (
                    similarMovies.map((movie) => (
                      <MovieCardScrollX key={movie.id} movie={movie} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin className='container mx-auto bg-force-remove' size='large' />
      )}
    </>
  );
};

export default MovieDetails;
