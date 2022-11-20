import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      </Provider>
    </>
  );
}

export default App;
