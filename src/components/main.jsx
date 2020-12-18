import { Carousel, Spin, BackTop, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import MovieDetails from './movieDetails';
import MovieCard from './common/movieCard';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';
import MovieCardScrollX from './common/movieCardScrollX';
import MoviesStyling from './common/moviesStyling';
import { useScroll } from './animation/useScroll';
import { motion } from 'framer-motion';
import { delayZoomOut, fade } from './animation/animate';

const Main = () => {
  // ANIMATIONS
  const [element, animControls] = useScroll();

  // HEADER AND SEARCH STATES
  const [headerData, setHeaderData] = useState([]);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [toFetchData, setToFetchData] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedCurrentPage, setSearchedCurrentPage] = useState(1);
  const [searchedTotalPage, setSearchedTotalPage] = useState(0);
  const [searchedText, setSearchedText] = useState('');
  const [totalMoviesResults, setTotalMoviesResults] = useState(0);

  //COMMON STATES
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onClickMovieID, setOnClickMovieID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [statusCode, setStatusCode] = useState(false);

  // NOW PLAYING STATES
  const [nowPlayingMovieData, setNowPlayingMovieData] = useState([]);
  const [nowPlayingCurrentPage, setNowPlayingCurrentPage] = useState(1);
  const [nowPlayingTotalPage, setNowPlayingTotalPage] = useState(0);

  // TRENDING MOVIES STATES
  const [trendMovieData, setTrendMovieData] = useState([]);
  const [trendCurrentPage, setTrendCurrentPage] = useState(1);
  const [trendTotalPage, setTrendTotalPage] = useState(0);

  // UPCOMING MOVIES STATES
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [upcomingCurrentPage, setUpcomingCurrentPage] = useState(1);
  const [upcomingTotalPage, setUpcomingTotalPage] = useState(0);

  // GETTING PICTURES TO PUT IN SLIDER ON TOP OF PAGE
  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setHeaderData(data.results.slice(0, 10));
      setHeaderLoading(false);
    }
    dataFetch();
  }, []);

  // GETTING SEARCH QUERY
  useEffect(() => {
    if (toFetchData) {
      async function searchDataFetch() {
        const { data: moviesFetched } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchedText}&page=${searchedCurrentPage}`
        );
        setSearchedMovies(moviesFetched.results);
        setSearchedTotalPage(moviesFetched.total_pages);
        setTotalMoviesResults(moviesFetched.total_results);
        setDataFetched(true);
      }
      searchDataFetch();
    }
  }, [toFetchData, searchedText, searchedCurrentPage]);

  // GETTING NOW PLAYING DATA
  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${nowPlayingCurrentPage}`
      );
      setNowPlayingMovieData(data.results);
      setNowPlayingTotalPage(data.total_pages);
    }
    dataFetch();
  }, [nowPlayingCurrentPage]);

  // GETTING TRENDING MOVIES DATA
  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${trendCurrentPage}`
      );
      setTrendMovieData(data.results);
      setTrendTotalPage(data.total_pages);
    }
    dataFetch();
  }, [trendCurrentPage]);

  // GETTING UPCOMING MOVIES DATA
  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${upcomingCurrentPage}`
      );
      setUpcomingMovieData(data.results);
      setUpcomingTotalPage(data.total_pages);
    }
    dataFetch();
  }, [upcomingCurrentPage]);

  // TO PREVENT REFRESH OF THE PAGE WHILE SEARCHING.
  const SearchMoviesHandler = (e) => {
    e.preventDefault();
    setSearchedCurrentPage(1);
    setToFetchData(true);
  };

  // reset page to 1 if we search again if we are not in page 1
  const searchTextHandler = (e) => {
    setSearchedText(e.target.value);
    setSearchedCurrentPage(1);
  };

  // / onClick to show modal /////////
  const showModalHandler = (movieID) => {
    setIsModalVisible(true);
    setOnClickMovieID(movieID);
  };

  // close modal after clicking the mask
  const modalCloseHandler = () => {
    setIsModalVisible(false);
    setStatusCode(false);
    setIsLoading(true);
    history.push('/');
  };

  return (
    <>
      <div className='top-0'>
        <div className='container mx-auto relative'>
          {!headerLoading ? (
            <motion.div
              ref={element}
              variants={fade}
              initial='hidden'
              animate={animControls}
            >
              <Carousel
                dotPosition='left'
                autoplay
                easing='linear'
                className='w-full opacity-75'
              >
                {headerData.map((movie) => (
                  <div key={movie.id}>
                    <div className='h-50vh'>
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt='img'
                        className='w-full h-full'
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            </motion.div>
          ) : (
            <Spin className='w-full mx-auto py-10' size='large' />
          )}

          <motion.div
            ref={element}
            variants={delayZoomOut}
            initial='hidden'
            animate={animControls}
            className='absolute top-0 left-0 w-full lg:mt-72 md:mt-56 sm-margin-top'
          >
            <div className='sm:py-10 py-5 lg:max-w-3xl md:max-w-xl sm:max-w-lg max-w-sm mx-auto rounded glass'>
              <div className='flex flex-col items-center'>
                <h1 className='lg:text-3xl md:text-2xl text-lg font-semibold text-center'>
                  Welcome to The Movie Database
                </h1>
                <p className='pb-3 italic md:text-base text-sm text-center'>
                  Watch movies to relax and grab your popcorn and beer
                </p>
              </div>

              <form
                className='relative md:max-w-lg sm:max-w-md mx-auto flex items-center justify-center'
                onSubmit={SearchMoviesHandler}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute top-0 left-0 lg:text-xl md:text-lg opacity-80 h-full my-auto lg:ml-3 md:ml-5 sm:ml-4 ml-9 xs-search-icon'
                />
                <input
                  type='text'
                  placeholder='Search movies. . .'
                  className='sm:w-4/5 w-8/12 py-1 lg:text-lg focus:outline-none focus:shadow-lg rounded-tl rounded-bl indent'
                  onChange={searchTextHandler}
                />
                <button
                  type='submit'
                  className='py-1 px-3 lg:text-lg bg-gray-400 rounded-tr rounded-br focus:outline-none focus:bg-gray-600 hover:text-white'
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* /////////////////SEARCH RESULTS ELEMENTS/////////////// */}
      {dataFetched && (
        <div className='sm:pt-14 pt-14 xs-padding-top'>
          <div className='container mx-auto'>
            <h1 className='text-lg font-semibold pb-5'>
              Total Results:
              <span className='ml-2 italic'>{totalMoviesResults}</span>
            </h1>
            {searchedMovies.length < 1 ? (
              <h1 className='italic'>No Results Found.</h1>
            ) : (
              <div className='flex flex-wrap justify-center sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                {searchedMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => showModalHandler(movie.id)}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='pt-8'>
            <div className='flex gap-5 justify-center'>
              {searchedCurrentPage > 1 && (
                <PrevButton
                  currentPage={searchedCurrentPage}
                  setCurrentPage={setSearchedCurrentPage}
                />
              )}
              {searchedTotalPage < 1 ? (
                ''
              ) : (
                <p className='sm:text-lg h-full my-auto'>
                  Page {searchedCurrentPage} of {searchedTotalPage}
                </p>
              )}

              {searchedCurrentPage !== searchedTotalPage &&
                searchedTotalPage > 1 && (
                  <NextButton
                    currentPage={searchedCurrentPage}
                    setCurrentPage={setSearchedCurrentPage}
                  />
                )}
            </div>
          </div>
        </div>
      )}

      {/* //////////////NOW PLAYING ELEMENTS///////////////////////////// */}
      <div className={`sm:py-14 ${dataFetched ? 'py-14' : 'pb-14 pt-28'} `}>
        <div className='container mx-auto'>
          <h1 className='md:text-3xl sm:text-xl text-lg italic font-semibold pb-8'>
            Now Playing in Cinema's
          </h1>
          <div className='p-5 rounded bg-white flex overflow-x-auto gap-5'>
            {nowPlayingMovieData.map((movie) => (
              <div key={movie.id} onClick={() => showModalHandler(movie.id)}>
                <Link to={`movie/${movie.id}`}>
                  <MovieCardScrollX movie={movie} />
                </Link>
              </div>
            ))}
          </div>
          <div className='pt-8'>
            <div className='flex gap-5 justify-center'>
              {nowPlayingCurrentPage > 1 && (
                <PrevButton
                  currentPage={nowPlayingCurrentPage}
                  setCurrentPage={setNowPlayingCurrentPage}
                />
              )}

              <p className='sm:text-lg h-full my-auto'>
                Page {nowPlayingCurrentPage} of {nowPlayingTotalPage}
              </p>

              {nowPlayingCurrentPage !== nowPlayingTotalPage && (
                <NextButton
                  currentPage={nowPlayingCurrentPage}
                  setCurrentPage={setNowPlayingCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ///////////////////TRENDING MOVIES ELEMENTS //////////////////////////*/}
      <MoviesStyling
        movieData={trendMovieData}
        showModalHandler={showModalHandler}
        currentPage={trendCurrentPage}
        setCurrentPage={setTrendCurrentPage}
        totalPages={trendTotalPage}
        name='Trending Movies'
      />

      {/* /////////////////////////UPCOMING MOVIES ELEMENTS/////////////////////////////// */}
      <MoviesStyling
        movieData={upcomingMovieData}
        showModalHandler={showModalHandler}
        currentPage={upcomingCurrentPage}
        setCurrentPage={setUpcomingCurrentPage}
        totalPages={upcomingTotalPage}
        name='Upcoming Movies'
      />

      {/* /////////////////////BACK TO TOP//////////////////////////// */}

      <BackTop>
        <button className='bg-gray-400 p-2 rounded cursor-pointer focus:outline-none hover:text-white hover:bg-black transition-all duration-500 ease-out'>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </BackTop>

      {/* showing modal */}
      <Modal
        visible={isModalVisible}
        closable={false}
        onCancel={modalCloseHandler}
        maskClosable={true}
        keyboard={true}
        width='75%'
        style={{ top: 40, height: '90vh', overflowY: 'auto' }}
        footer={false}
        className='ant-modal-wrap'
      >
        {onClickMovieID && (
          <MovieDetails
            onClickMovieID={onClickMovieID}
            setOnClickMovieID={setOnClickMovieID}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            statusCode={statusCode}
            setStatusCode={setStatusCode}
            className='overflow-hidden bg-none'
          />
        )}
      </Modal>
    </>
  );
};

export default Main;
