import Main from './components/main';
import PopularMovieSeries from './components/popularMovieSeries';
import TrendingMovies from './components/trendingMovies';
import UpcomingMovies from './components/upcomingMovies';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Main />
      <TrendingMovies />
      <UpcomingMovies />
      <PopularMovieSeries />
    </div>
  );
};

export default App;
