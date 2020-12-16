import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Modal } from 'antd';
import MovieDetails from './movieDetails';
import { useHistory } from 'react-router-dom';
import MovieCard from './common/movieCard';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';

const Main = () => {
  const [headerData, setHeaderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [toFetchData, setToFetchData] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedCurrentPage, setSearchedCurrentPage] = useState(1);
  const [searchedTotalPage, setSearchedTotalPage] = useState(0);
  const [searchedText, setSearchedText] = useState('');
  const [totalMoviesResults, setTotalMoviesResults] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onClickMovieID, setOnClickMovieID] = useState(0);

  const history = useHistory();

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

  useEffect(() => {
    if (toFetchData) {
      async function searchDataFetch() {
        const { data: moviesFetched } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchedText}&page=${searchedCurrentPage}`
        );
        setSearchedMovies(moviesFetched.results);
        setSearchedTotalPage(moviesFetched.total_pages);
        setTotalMoviesResults(moviesFetched.total_results);
        console.log(moviesFetched);
        setDataFetched(true);
      }
      searchDataFetch();
    }
  }, [toFetchData, searchedText, searchedCurrentPage]);

  const SearchMoviesHandler = (e) => {
    e.preventDefault();
    setSearchedCurrentPage(1);
    setToFetchData(true);
  };

  const searchTextHandler = (e) => {
    setSearchedText(e.target.value);
    setSearchedCurrentPage(1);
  };

  // / onClick to show modal /////////
  const showModalHandler = (movieID) => {
    setIsModalVisible(true);
    setOnClickMovieID(movieID);
  };

  // close modal after click the mask
  const modalCloseHandler = () => {
    setIsModalVisible(false);
    setIsLoading(!isLoading);
    history.push('/');
  };

  return (
    <>
      <div className='top-0'>
        <div className='container mx-auto relative overflow-hidden'>
          {!headerLoading ? (
            <Carousel
              dotPosition='left'
              autoplay
              easing='linear'
              className='w-full opacity-75'
            >
              {headerData.map((movie) => (
                <div key={movie.id}>
                  <h3 className='h-50vh text-center'>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt='img'
                      className='w-full'
                    />
                  </h3>
                </div>
              ))}
            </Carousel>
          ) : (
            <Spin className='font-4xl' />
          )}

          <div className='absolute top-0 left-0 w-full mt-64'>
            <div className='py-10 max-w-3xl mx-auto rounded glass'>
              <div className='flex flex-col items-center'>
                <h1 className='text-3xl font-semibold'>
                  Welcome to The Movie Database
                </h1>
                <p className='pb-3 italic'>
                  Watch movies to relax and grab your popcorn and beer
                </p>
              </div>

              <form
                className='relative max-w-lg mx-auto'
                onSubmit={SearchMoviesHandler}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute top-0 left-0 text-xl opacity-80 h-full my-auto ml-1'
                />
                <input
                  type='text'
                  placeholder='Search movies. . .'
                  className='w-4/5 py-1 text-lg focus:outline-none focus:shadow-lg rounded-tl rounded-bl indent'
                  onChange={searchTextHandler}
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

      {dataFetched && (
        <div className='pt-14'>
          <div className='container mx-auto'>
            <h1 className='text-lg font-semibold pb-5'>
              Total Results:
              <span className='ml-2 italic'>{totalMoviesResults}</span>
            </h1>
            {searchedMovies.length < 1 ? (
              <h1 className='italic'>No Results Found.</h1>
            ) : (
              <div className='grid grid-cols-4 xl:grid-cols-5 gap-5'>
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
                <p className='text-lg h-full my-auto'>
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
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className='overflow-hidden bg-none'
          />
        )}
      </Modal>
    </>
  );
};

export default Main;
