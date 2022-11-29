import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from './components/Header/Header';
import Loader from './components/UI/Loader/Loader';

const MainPage = lazy(() => import('./pages/Main'));
const CartPage = lazy(() => import('./pages/Cart'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className='wrapper'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<MainPage />}
            />
            <Route
              path='cart'
              element={<CartPage />}
            />
            <Route
              path='*'
              element={<Navigate to={'/'} />}
            />
          </Routes>
        </div>

        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Suspense>
    </>
  );
}

export default App;
