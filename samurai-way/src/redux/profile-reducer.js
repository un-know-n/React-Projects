import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

let initialState = {
  postsData: [
    { id: 1, title: 'Post 1', likesCount: '12' },
    { id: 2, title: 'Post 2', likesCount: '14' },
    { id: 3, title: 'Post 3', likesCount: '1' },
    { id: 4, title: 'Post 4', likesCount: '18' },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let currentID = state.postsData.at(-1).id;
      const newPostObj = {
        id: currentID ? currentID + 1 : 1,
        title: action.message,
        likesCount: '0',
      };
      return {
        ...state,
        postsData: [...state.postsData, newPostObj],
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_USER_STATUS:
      return { ...state, status: action.userStatus };

    default:
      return state;
  }
};

export default profileReducer;

export const addPost_AC = (message) => ({ type: ADD_POST, message });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (userStatus) => ({
  type: SET_USER_STATUS,
  userStatus,
});

export const takeUser_TC = (userId) => {
  return (dispatch) => {
    profileAPI
      .takeUserProfile(userId)
      .then((data) => dispatch(setUserProfile(data)));
  };
};

export const getUserStatus_TC = (userId) => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then((data) => {
      // console.log(data);
      dispatch(setUserStatus(data));
    });
  };
};

export const updateUserStatus_TC = (status) => {
  return (dispatch) => {
    profileAPI.updateUserStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        // console.log(response.data);
        dispatch(setUserStatus(status));
      }
    });
  };
};
