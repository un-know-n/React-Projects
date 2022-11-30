import React, { lazy, Suspense, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from './components/Header/Header';
import AppRouter from './components/UI/AppRouter/AppRouter';
import Loader from './components/UI/Loader/Loader';
import { AuthContext } from './context/auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
