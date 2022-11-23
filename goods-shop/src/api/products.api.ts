import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { limit } from '../constants/filter';
import { IFilter } from '../types/IFilter';
import { IProduct } from '../types/IProduct';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProduct[], any>({
      query: () => ({
        url: '/products',
      }),
    }),
    fetchProductsByFilter: build.query<IProduct[], IFilter>({
      query: ({ category, limit, query, sort, page }) => ({
        url: `/products`,
        params: {
          q: query,
          _sort: sort.sortProps.title,
          _order: sort.sortProps.order,
          _limit: limit,
          _page: page,
          ...(category !== 'all' && { category }),
          // category: category === 'all' ? '' : category,
        },
      }),
    }),
  }),
});

export const { useFetchAllProductsQuery } = productsAPI;
export const { useLazyFetchProductsByFilterQuery } = productsAPI;
