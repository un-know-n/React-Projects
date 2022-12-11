import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useUserAuth } from '../../../hooks/useUserAuth';
import ErrorPage from '../../../pages/ErrorPage';
import { authRoutes, privateRoutes, publicRoutes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { setUser } from '../../../store/reducers/user.slice';
import Layout from '../Layout/Layout';
import Loader from './../Loader/Loader';

const AppRouter = () => {
  const [user, userLoading, userError] = useUserAuth();
  const dispatch = useAppDispatch();

  const { db } = useAuthContext();

  if (userLoading)
    return (
      <>
        <Layout>
          <div className='h-screen flex justify-center items-center'>
            <Loader />
          </div>
        </Layout>
      </>
    );

  if (!userLoading && !userError) {
    dispatch(
      setUser({
        username: user?.displayName!,
        email: user?.email!,
        userId: user?.uid,
      }),
    );
  }

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
