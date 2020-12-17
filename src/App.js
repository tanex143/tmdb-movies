import Main from './components/main';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Route path={['/movie/:id', '/']}>
        <Main />
      </Route>
    </div>
  );
};

export default App;
