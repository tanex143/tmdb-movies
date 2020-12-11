import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from './common/movieCard';
import PrevButton from './common/prevButton';
import NextButton from './common/nextButton';
import { Modal } from 'antd';
import MovieDetails from './movieDetails';
import { useHistory, useLocation } from 'react-router-dom';

const TrendingMovies = () => {
  const [trendMovieData, setTrendMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [trendTotalPage, setTrendTotalPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onClickMovieID, setOnClickMovieID] = useState(null);
  const location = useLocation();
  const pathID = location.pathname;
  const history = useHistory();
  console.log(pathID);

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );
      setTrendMovieData(data.results);
      setTrendTotalPage(data.total_pages);
      console.log('Trending', data);
    }
    dataFetch();
  }, [currentPage]);

  const showModal = (movieID) => {
    setIsModalVisible(true);
    setOnClickMovieID(movieID);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='pb-14'>
        <div className='container mx-auto'>
          <h1 className='text-3xl italic font-semibold pb-8'>
            Trending Movies
          </h1>
          <div className='grid grid-cols-4 xl:grid-cols-5 gap-5'>
            {trendMovieData.map((movie) => (
              <div key={movie.id} onClick={() => showModal(movie.id)}>
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
                Page {currentPage} of {trendTotalPage}
              </p>

              {currentPage !== trendTotalPage && (
                <NextButton
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* showing modal */}
      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        keyboard={false}
        width='75%'
        style={{ top: 40, height: '100vh', overflowY: 'auto' }}
      >
        <MovieDetails onClickMovieID={onClickMovieID} />
      </Modal>
    </>
  );
};

export default TrendingMovies;
