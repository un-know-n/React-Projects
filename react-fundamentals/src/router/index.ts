import { About } from '../pages/About';
import { CurrentPost } from '../pages/CurrentPost';
import { Login } from '../pages/Login';
import { Posts } from '../pages/Posts';

export const privateRoutes = [
  { path: '/about', component: About },
  { path: '/posts/:id', component: CurrentPost },
  { path: '/posts', component: Posts },
];

export const publicRoutes = [{ path: '/login', component: Login, exact: true }];
