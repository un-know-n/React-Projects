import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../../context/auth';
import { useUserAuth } from '../../../hooks/useUserAuth';
import ErrorPage from '../../../pages/ErrorPage';
import { authRoutes, privateRoutes, publicRoutes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { setUser } from '../../../store/reducers/user.slice';
import Layout from '../Layout/Layout';
import Loader from './../Loader/Loader';

const AppRouter = () => {
  const [user, loading, error] = useUserAuth();
  const dispatch = useAppDispatch();

  if (loading)
    return (
      <>
        <Layout>
          <div className='h-screen flex justify-center items-center'>
            <Loader />
          </div>
        </Layout>
      </>
    );

  if (!loading && !error)
    dispatch(setUser({ username: user?.displayName!, email: user?.email! }));

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
        {!user &&
          authRoutes.map((route) => (
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
