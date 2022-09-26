import Settings from '../components/Settings/Settings';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const TAKE_USERS = 'TAKE-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';

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
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
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
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };
    default:
      return state;
  }
};

export default usersReducer;

export const follow_AC = (userId) => ({ type: FOLLOW, userId: userId });
export const unfollow_AC = (userId) => ({ type: UNFOLLOW, userId: userId });
export const takeUsers_AC = (users) => ({ type: TAKE_USERS, users: users });
export const setCurrentPageAC = (page) => ({
  type: SET_CURRENT_PAGE,
  currentPage: page,
});
export const setTotalCountAC = (count) => ({
  type: SET_TOTAL_COUNT,
  totalUsersCount: count,
});
