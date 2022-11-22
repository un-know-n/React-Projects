import { TCategories, TSorts } from './common';

export interface IFilter {
  category: TCategories;
  sort: TSorts;
  query: string;
  limit: number;
  page: number;
}

//* Possible variant
// category: 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";
//   sort: 'asc' | 'desc' | 'price' | 'alphabet';
