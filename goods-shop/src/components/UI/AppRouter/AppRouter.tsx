import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../../context/auth';
import Cart from '../../../pages/Cart';
import Main from '../../../pages/Main';
import { authRoutes, privateRoutes, publicRoutes } from '../../../routes';

// const MainPage = lazy(() => import('./pages/Main'));
// const CartPage = lazy(() => import('./pages/Cart'));

const AppRouter = () => {
  const Auth = useContext(AuthContext);

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
        {Auth?.isAuth === true
          ? privateRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.element />}
              />
            ))
          : authRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.element />}
              />
            ))}
        <Route
          path='*'
          element={<Navigate to={'/'} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
