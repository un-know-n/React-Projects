import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const TAKE_USERS = 'TAKE-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const FOLLOW_IN_PROGRESS = 'FOLLOW-IN-PROGRESS';

// usersData: [
//   {
//     id: 1,
//     fullName: 'Someone Else',
//     description: 'Lorem ipsum dolor sit amet',
//     location: { city: 'City', country: 'Country' },
//     followed: true,
//     photoUrl:
//       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
//   },
//   {
//     id: 2,
//     fullName: 'Someone Else',
//     description: 'Lorem ipsum ',
//     location: { city: 'icty', country: 'USA' },
//     followed: false,
//     photoUrl:
//       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
//   },
//   {
//     id: 3,
//     fullName: 'Someone Else',
//     description: 'Lorem ipsum dolor sit amet',
//     location: { city: 'City', country: 'Ukraine' },
//     followed: true,
//     photoUrl:
//       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
//   },
// ],

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
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) return { ...user, followed: true };
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) return { ...user, followed: false };
          return user;
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
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(usersAmount, currentPage).then((data) => {
      dispatch(takeUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
      dispatch(toggleIsFetching(false));
    });
  };
};

export const unfollowUserThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowInProgress(true, userId));
    usersAPI.unfollowUser(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollow(userId));
        dispatch(toggleFollowInProgress(false, userId));
      } else console.log(response.data);
    });
  };
};

export const followUserThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowInProgress(true, userId));
    usersAPI.followUser(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(follow(userId));
        dispatch(toggleFollowInProgress(false, userId));
      } else console.log(response.data);
    });
  };
};
