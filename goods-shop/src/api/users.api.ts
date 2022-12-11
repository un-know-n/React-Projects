import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IComment } from '../types/IComment';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/posts',
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    fetchUsersByProduct: build.query<IComment[], number | string>({
      query: (id) => ({
        url: `/${id}/comments`,
      }),
    }),
  }),
});

export const { useFetchUsersByProductQuery } = usersAPI;
