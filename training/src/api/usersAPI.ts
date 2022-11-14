import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUser } from '../types/IUsers';

export {};

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit: number = 1) => ({
        url: '/users',
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ['Users'],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: (result) => ['Users'],
    }),
  }),
});
