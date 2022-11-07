import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../../context';
import { Login } from '../../../pages/Login';
import { privateRoutes, publicRoutes } from '../../../router';
import { Loader } from '../Loader/Loader';

export const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loader />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        {isAuth
          ? privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
        <Route path="/*" element={<Login />} />
      </Routes>
    </>
  );
};
