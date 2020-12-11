import Main from './components/main';
import TrendingMovies from './components/trendingMovies';
import UpcomingMovies from './components/upcomingMovies';
import NowPlaying from './components/nowPlaying';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Route path={['/movie/:id', '/']}>
        <Main />
      </Route>
      <NowPlaying />
      <TrendingMovies />
      <UpcomingMovies />
    </div>
  );
};

export default App;
