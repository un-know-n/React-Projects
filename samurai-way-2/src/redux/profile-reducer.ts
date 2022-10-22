import { stopSubmit } from 'redux-form';

import { profileAPI } from '../api/api';
import { PhotoType, PostType, ProfileType } from '../shared/types/reducer-types';

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';

let initialState = {
  postsData: [
    { id: 1, title: 'Post 1', likesCount: '12' },
    { id: 2, title: 'Post 2', likesCount: '14' },
    { id: 3, title: 'Post 3', likesCount: '1' },
    { id: 4, title: 'Post 4', likesCount: '18' },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      //let currentID = state.postsData.at(-1).id;
      const currentID = state.postsData[state.postsData.length - 1].id;
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

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photo: action.photo } as ProfileType,
      };

    default:
      return state;
  }
};

export default profileReducer;

type AddPostType = {
  type: typeof ADD_POST;
  message: string;
};

export const addPost_AC = (message: string): AddPostType => ({
  type: ADD_POST,
  message,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost_AC = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetUserStatusType = {
  type: typeof SET_USER_STATUS;
  userStatus: string;
};

export const setUserStatus = (userStatus: string): SetUserStatusType => ({
  type: SET_USER_STATUS,
  userStatus,
});

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photo: PhotoType;
};

export const savePhotoSuccess = (photo: PhotoType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photo,
});

export const takeUser_TC = (userId: number) => {
  return async (dispatch: any) => {
    const data = await profileAPI.takeUserProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatus_TC = (userId: number) => {
  return async (dispatch: any) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatus_TC = (status: string) => {
  return async (dispatch: any) => {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export const savePhoto_TC = (photo: PhotoType) => {
  return async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photo));
    }
  };
};

export const saveProfile_TC = (profile: ProfileType) => {
  return async (dispatch: any, getState: any) => {
    const response = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;
    if (response.data.resultCode === 0) {
      dispatch(takeUser_TC(userId));
    } else {
      const message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Unexpected error...';
      dispatch(stopSubmit('edit-profile', { _error: message }));
      return Promise.reject(message);
    }
  };
};
