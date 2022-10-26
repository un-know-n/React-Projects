import { UsersDataType } from '../shared/types/reducer-types';
import { GeneralResponse, GetItemsType, instance } from './api';

export const usersAPI = {
  getUsers(usersAmount = 5, page = 1) {
    return instance
      .get<GetItemsType<UsersDataType>>(
        `users?count=${usersAmount}&page=${page}`,
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
