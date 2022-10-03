import { createSelector } from 'reselect';

export const getUsersSelector = (state) => {
  return state.users.usersData;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((user) => true);
});

export const getUsersAmount = (state) => {
  return state.users.usersAmount;
};
export const getTotalUsersCount = (state) => {
  return state.users.totalUsersCount;
};
export const getCurrentPage = (state) => {
  return state.users.currentPage;
};
export const getIsFetching = (state) => {
  return state.users.isFetching;
};
export const getFollowInProgress = (state) => {
  return state.users.followInProgress;
};
