import Main from './components/main';
import { Route } from 'react-router-dom';
import Footer from './components/footer';

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <div className='bg-gray-100 px-5'>
        <Route path={['/movie/:id', '/']}>
          <Main />
        </Route>
      </div>
      <Footer />
    </div>
  );
};

export default App;
