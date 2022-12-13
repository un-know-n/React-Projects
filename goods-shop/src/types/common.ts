import { LazyExoticComponent } from 'react';

import { categories, sorts } from '../constants/filter';
import { Routes } from '../routes';

// Types of main instances from constants file
export type TCategories = typeof categories[number];
export type TSorts = typeof sorts[number];

// Main app routes
export type TRoute = {
  path: Routes;
  //element: () => JSX.Element;
  element: LazyExoticComponent<() => JSX.Element>;
};
