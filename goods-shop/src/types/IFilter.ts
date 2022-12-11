import { TCategories, TSorts } from './common';

//General type for filter on main page
export interface IFilter {
  category?: TCategories;
  sort: TSorts;
  query?: string;
  limit: number;
  page: number;
}
