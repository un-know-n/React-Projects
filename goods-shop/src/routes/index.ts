import { lazy } from 'react';

import SignUp from '../components/UI/Auth/SignUp/SignUp';
import SignIn from '../components/UI/Auth/SingIn/SignIn';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Profile from '../pages/Profile';
import { TRoute } from '../types/common';

export enum Routes {
  SignIn = '/signin',
  SignUp = '/signup',
  ResetPassword = '/resetpass',
  Home = '/',
  Cart = '/cart',
  Profile = '/profile',
  Product = '/product/:id',
}

//TODO: Try to make lazy loadings!!

const MainPage = lazy(() => import('../pages/Main'));
const CartPage = lazy(() => import('../pages/Cart'));
const ProductPage = lazy(() => import('../pages/Product'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const SignUpPage = lazy(() => import('../components/UI/Auth/SignUp/SignUp'));
const SignInPage = lazy(() => import('../components/UI/Auth/SingIn/SignIn'));
const ResetPassPage = lazy(
  () => import('../components/UI/Auth/ResetPass/ResetPass'),
);

export const authRoutes: TRoute[] = [
  {
    path: Routes.SignIn,
    element: SignInPage,
  },
  {
    path: Routes.SignUp,
    element: SignUpPage,
  },
  {
    path: Routes.ResetPassword,
    element: ResetPassPage,
  },
];

export const publicRoutes: TRoute[] = [
  {
    path: Routes.Home,
    element: MainPage,
  },
  {
    path: Routes.Product,
    element: ProductPage,
  },
];

export const privateRoutes: TRoute[] = [
  {
    path: Routes.Cart,
    element: CartPage,
  },
  {
    path: Routes.Profile,
    element: ProfilePage,
  },
];
