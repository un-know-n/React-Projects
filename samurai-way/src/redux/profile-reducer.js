import { profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';

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

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.postId),
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
export const deletePost_AC = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (userStatus) => ({
  type: SET_USER_STATUS,
  userStatus,
});

export const takeUser_TC = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.takeUserProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatus_TC = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatus_TC = (status) => {
  return async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};
