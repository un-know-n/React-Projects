import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/helpers/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const TAKE_USERS = 'users/TAKE-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'users/SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const FOLLOW_IN_PROGRESS = 'users/FOLLOW-IN-PROGRESS';

let initialState = {
  usersData: [],
  usersAmount: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [],
};

const usersReducer = (state = initialState, action) => {
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const takeUsers = (users) => ({ type: TAKE_USERS, users });
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  page,
});
export const setTotalCount = (count) => ({
  type: SET_TOTAL_COUNT,
  count,
});
export const toggleIsFetching = (fetching) => ({
  type: TOGGLE_IS_FETCHING,
  fetching,
});
export const toggleFollowInProgress = (inProgress, userId) => {
  return {
    type: FOLLOW_IN_PROGRESS,
    inProgress,
    userId,
  };
};

export const getUsersThunkCreator = (usersAmount, currentPage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(usersAmount, currentPage);
    dispatch(takeUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const followUnfollowFlow = (userId, apiMethod, actionCreator) => {
  return async (dispatch) => {
    dispatch(toggleFollowInProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
      dispatch(toggleFollowInProgress(false, userId));
    } else console.log(response.data);
  };
};

export const unfollowUserThunkCreator = (userId) => {
  return followUnfollowFlow(userId, usersAPI.unfollowUser, unfollow);
};

export const followUserThunkCreator = (userId) => {
  return followUnfollowFlow(userId, usersAPI.followUser, follow);
};
