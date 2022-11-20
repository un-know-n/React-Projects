import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IProduct } from '../types/IProduct';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProduct[], number>({
      query: (limit = 10) => ({
        url: '/products',
        params: {
          limit,
        },
      }),
    }),
  }),
});

export const { useFetchAllProductsQuery } = productsAPI;
