import { categories, sorts } from '../constants/filter';
import { Routes } from '../routes';

// From constants file
export type TCategories = typeof categories[number];
export type TSorts = typeof sorts[number];

//Routes
export type TRoute = {
  path: Routes;
  element: () => JSX.Element;
};
