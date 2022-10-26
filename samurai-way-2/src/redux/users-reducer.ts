import { ThunkAction } from 'redux-thunk';

import { usersAPI } from '../api/users-api';
import { UsersDataType } from '../shared/types/reducer-types';
import { updateObjectInArray } from '../utils/helpers/object-helpers';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
  usersData: [] as Array<UsersDataType>,
  usersAmount: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const usersReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: true,
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: false,
        }),
      };
    case 'TAKE_USERS':
      return { ...state, usersData: action.users };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.page };
    case 'SET_TOTAL_COUNT':
      return { ...state, totalUsersCount: action.count };
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.fetching };
    case 'FOLLOW_IN_PROGRESS':
      return {
        ...state,
        followInProgress: action.inProgress
          ? [...state.followInProgress, action.userId]
          : state.followInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

export default usersReducer;

export const actions = {
  follow: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unfollow: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  takeUsers: (users: Array<UsersDataType>) =>
    ({
      type: 'TAKE_USERS',
      users,
    } as const),

  setCurrentPage: (page: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      page,
    } as const),

  setTotalCount: (count: number) =>
    ({
      type: 'SET_TOTAL_COUNT',
      count,
    } as const),

  toggleIsFetching: (fetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      fetching,
    } as const),

  toggleFollowInProgress: (inProgress: boolean, userId: number) =>
    ({
      type: 'FOLLOW_IN_PROGRESS',
      inProgress,
      userId,
    } as const),
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsersThunkCreator = (
  usersAmount: number,
  currentPage: number,
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(usersAmount, currentPage);
    dispatch(actions.takeUsers(data.items));
    dispatch(actions.setTotalCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
  };
};

const followUnfollowFlow = (
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes,
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowInProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
      dispatch(actions.toggleFollowInProgress(false, userId));
    } else console.log(response.data);
  };
};

export const unfollowUserThunkCreator = (userId: number) => {
  return followUnfollowFlow(userId, usersAPI.unfollowUser, actions.unfollow);
};

export const followUserThunkCreator = (userId: number) => {
  return followUnfollowFlow(userId, usersAPI.followUser, actions.follow);
};
