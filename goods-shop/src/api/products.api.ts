import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/api';
import { limit } from '../constants/filter';
import { IFilter } from '../types/IFilter';
import { IProduct } from '../types/IProduct';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
        //* Params for local json-server
        // params: {
        //   q: query,
        //   _sort: sort.sortProps.title,
        //   _order: sort.sortProps.order,
        //   _limit: limit,
        //   _page: page,
        //   ...(category !== 'all' && { category }),
        // },
        //* Params for API
        params: {
          search: query,
          sortBy: sort.sortProps.title,
          order: sort.sortProps.order,
          limit: limit,
          page: page,
          ...(category !== 'all' && { category }),
        },
      }),
    }),
    fetchProductById: build.query<IProduct, string | number>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
    fetchSimilarProducts: build.query<IProduct[], string>({
      query: (category) => ({
        url: `/products`,
        params: {
          category,
        },
      }),
    }),
  }),
});

export const { useFetchAllProductsQuery } = productsAPI;
export const { useLazyFetchProductsByFilterQuery } = productsAPI;
export const { useFetchProductByIdQuery } = productsAPI;
export const { useLazyFetchSimilarProductsQuery } = productsAPI;
