import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from '.';
import { Header } from './components/Header/Header';
import { Cart } from './pages/Cart';
import { Main } from './pages/Main';

function App() {
  return (
    <>
      <Provider store={store}>
        <div className='wrapper'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Main />}
            />
            <Route
              path='cart'
              element={<Cart />}
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
      </Provider>
    </>
  );
}

export default App;
