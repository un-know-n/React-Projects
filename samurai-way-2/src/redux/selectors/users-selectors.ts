import { createSelector } from 'reselect';

import { AppStateType } from '../redux-store';

export type WeakSelectorType = (state: AppStateType) => any;

export const getUsersSelector: WeakSelectorType = (state) => {
  return state.users.usersData;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((user: any) => true);
});

export const getUsersAmount: WeakSelectorType = (state) => {
  return state.users.usersAmount;
};

export const getTotalUsersCount: WeakSelectorType = (state) => {
  return state.users.totalUsersCount;
};

export const getCurrentPage: WeakSelectorType = (state) => {
  return state.users.currentPage;
};

export const getIsFetching: WeakSelectorType = (state) => {
  return state.users.isFetching;
};

export const getFollowInProgress: WeakSelectorType = (state) => {
  return state.users.followInProgress;
};
