import { TFilter } from '../redux/users-reducer';
import { UsersDataType } from '../shared/types/reducer-types';
import { GeneralResponse, GetItemsType, instance } from './api';

export const usersAPI = {
  getUsers(usersAmount = 5, page = 1, { term, friend }: TFilter) {
    let filter = (term && `&term=${term}`) + (friend && `&friend=${friend}`);
    filter = filter === 'null' ? '' : filter;
    debugger;
    return instance
      .get<GetItemsType<UsersDataType>>(
        `users?count=${usersAmount}&page=${page}${filter}`,
      )
      .then((response) => response.data);
  },
  followUser(userId: number) {
    return instance.post<GeneralResponse>(`follow/${userId}`, {});
  },
  unfollowUser(userId: number) {
    return instance.delete<GeneralResponse>(`follow/${userId}`);
  },
};
