import ResetPass from '../components/UI/Auth/ResetPass/ResetPass';
import SignUp from '../components/UI/Auth/SignUp/SignUp';
import SignIn from '../components/UI/Auth/SingIn/SignIn';
import Cart from '../pages/Cart';
import Main from '../pages/Main';
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

// const MainPage = lazy(() => import('./pages/Main'));
// const CartPage = lazy(() => import('./pages/Cart'));

export const authRoutes: TRoute[] = [
  {
    path: Routes.SignIn,
    element: SignIn,
  },
  {
    path: Routes.SignUp,
    element: SignUp,
  },
  {
    path: Routes.ResetPassword,
    element: ResetPass,
  },
];

export const publicRoutes: TRoute[] = [
  {
    path: Routes.Home,
    element: Main,
  },
  {
    path: Routes.Product,
    element: Product,
  },
];

export const privateRoutes: TRoute[] = [
  {
    path: Routes.Cart,
    element: Cart,
  },
  {
    path: Routes.Profile,
    element: Profile,
  },
];
