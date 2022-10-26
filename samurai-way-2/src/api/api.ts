import axios from 'axios';

import { ResultCodes } from '../shared/types/reducer-types';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'api-key': '359cbfdd-7b55-42b3-b3e3-34b581fec953',
  },
});

export type GeneralResponse<T = {}, RC = ResultCodes> = {
  data: T;
  messages: Array<string>;
  resultCode: RC;
};

export type GetItemsType<T> = {
  items: Array<T>;
  totalCount: number;
  error: string | null;
};
