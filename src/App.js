import Main from './components/main';
import TrendingMovies from './components/trendingMovies';
import UpcomingMovies from './components/upcomingMovies';
import NowPlaying from './components/nowPlaying';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Main />
      <NowPlaying />
      <TrendingMovies />
      <UpcomingMovies />
    </div>
  );
};

export default App;
