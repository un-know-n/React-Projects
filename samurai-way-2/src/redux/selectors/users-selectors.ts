import { createSelector } from 'reselect';

import { AppStateType } from '../redux-store';

export const getUsersSelector = (state: AppStateType) => {
  return state.users.usersData;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((user) => true);
});

export const getUsersAmount = (state: AppStateType) => {
  return state.users.usersAmount;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.users.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.users.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.users.isFetching;
};

export const getFollowInProgress = (state: AppStateType) => {
  return state.users.followInProgress;
};
