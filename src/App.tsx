import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'view/Home';
import { useLoading } from 'core/loading/LoadingContext';
import Loader from 'common/Loader';

const App = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

      {isLoading && <Loader />}
    </>
  );
};

export default App;
