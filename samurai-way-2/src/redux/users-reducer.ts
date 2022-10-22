import { usersAPI } from '../api/api';
import { UsersDataType } from '../shared/types/reducer-types';
import { updateObjectInArray } from '../utils/helpers/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const TAKE_USERS = 'users/TAKE-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'users/SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const FOLLOW_IN_PROGRESS = 'users/FOLLOW-IN-PROGRESS';

let initialState = {
  usersData: [] as Array<UsersDataType>,
  usersAmount: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: false,
        }),
      };
    case TAKE_USERS:
      return { ...state, usersData: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case SET_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.fetching };
    case FOLLOW_IN_PROGRESS:
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

type FollowType = {
  type: typeof FOLLOW;
  userId: number;
};

export const follow = (userId: number): FollowType => ({
  type: FOLLOW,
  userId,
});

type UnfollowType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollow = (userId: number): UnfollowType => ({
  type: UNFOLLOW,
  userId,
});

type TakeUsersType = {
  type: typeof TAKE_USERS;
  users: UsersDataType;
};

export const takeUsers = (users: UsersDataType): TakeUsersType => ({
  type: TAKE_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  page: number;
};

export const setCurrentPage = (page: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  page,
});

type SetTotalCountType = {
  type: typeof SET_TOTAL_COUNT;
  count: number;
};

export const setTotalCount = (count: number): SetTotalCountType => ({
  type: SET_TOTAL_COUNT,
  count,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  fetching: boolean;
};

export const toggleIsFetching = (fetching: boolean): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  fetching,
});

type ToggleFollowInProgressType = {
  type: typeof FOLLOW_IN_PROGRESS;
  inProgress: boolean;
  userId: number;
};

export const toggleFollowInProgress = (
  inProgress: boolean,
  userId: number,
): ToggleFollowInProgressType => {
  return {
    type: FOLLOW_IN_PROGRESS,
    inProgress,
    userId,
  };
};

export const getUsersThunkCreator = (
  usersAmount: number,
  currentPage: number,
) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(usersAmount, currentPage);
    dispatch(takeUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const followUnfollowFlow = (
  userId: number,
  apiMethod: any,
  actionCreator: any,
) => {
  return async (dispatch: any) => {
    dispatch(toggleFollowInProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
      dispatch(toggleFollowInProgress(false, userId));
    } else console.log(response.data);
  };
};

export const unfollowUserThunkCreator = (userId: number) => {
  return followUnfollowFlow(userId, usersAPI.unfollowUser, unfollow);
};

export const followUserThunkCreator = (userId: number) => {
  return followUnfollowFlow(userId, usersAPI.followUser, follow);
};
