import Main from './components/main';
import TrendingMovies from './components/trendingMovies';
import UpcomingMovies from './components/upcomingMovies';
import NowPlaying from './components/nowPlaying';
import { Route } from 'react-router-dom';
import Footer from './components/footer';
import { BackTop } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Route path={['/movie/:id', '/']}>
        <Main />
      </Route>
      <NowPlaying />
      <TrendingMovies />
      <UpcomingMovies />
      <Footer />
      <BackTop>
        <button className='bg-gray-300 p-2 rounded cursor-pointer focus:outline-none hover:text-white hover:bg-black transition-all duration-500 ease-out'>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </BackTop>
    </div>
  );
};

export default App;
