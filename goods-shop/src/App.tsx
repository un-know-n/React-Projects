import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Cart } from './pages/Cart';
import { Main } from './pages/Main';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
