import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../../context/auth';
import { useUserAuth } from '../../../hooks/useUserAuth';
import ErrorPage from '../../../pages/ErrorPage';
import { authRoutes, privateRoutes, publicRoutes } from '../../../routes';
import Layout from '../Layout/Layout';
import Loader from './../Loader/Loader';

// const MainPage = lazy(() => import('./pages/Main'));
// const CartPage = lazy(() => import('./pages/Cart'));
const AppRouter = () => {
  const [user, loading, error] = useUserAuth();

  if (loading)
    return (
      <>
        <Layout>
          <Loader />
        </Layout>
      </>
    );

  return (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={<route.element />}
          />
        ))}
        {authRoutes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={<route.element />}
          />
        ))}
        {user &&
          privateRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<route.element />}
            />
          ))}
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
