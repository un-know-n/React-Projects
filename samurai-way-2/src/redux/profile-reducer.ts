import { stopSubmit } from 'redux-form';

import { profileAPI } from '../api/profile-api';
import { PhotoType, PostType, ProfileType } from '../shared/types/reducer-types';
import { GeneralThunkType, InferActionsTypes } from './redux-store';

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
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = GeneralThunkType;

const profileReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST':
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

    case 'profile/DELETE-POST':
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.postId),
      };

    case 'profile/SET-USER-PROFILE':
      return { ...state, profile: action.profile };

    case 'profile/SET-USER-STATUS':
      return { ...state, status: action.userStatus };

    case 'profile/SAVE-PHOTO-SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photo: action.photo } as ProfileType,
      };

    default:
      return state;
  }
};

export default profileReducer;

export const actions = {
  addPost_AC: (message: string) =>
    ({
      type: 'profile/ADD-POST',
      message,
    } as const),

  deletePost_AC: (postId: number) =>
    ({
      type: 'profile/DELETE-POST',
      postId,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'profile/SET-USER-PROFILE',
      profile,
    } as const),

  setUserStatus: (userStatus: string) =>
    ({
      type: 'profile/SET-USER-STATUS',
      userStatus,
    } as const),

  savePhotoSuccess: (photo: PhotoType) =>
    ({
      type: 'profile/SAVE-PHOTO-SUCCESS',
      photo,
    } as const),
};

export const takeUser_TC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.takeUserProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
};

export const getUserStatus_TC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(actions.setUserStatus(data));
  };
};

export const updateUserStatus_TC = (status: string): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };
};

export const savePhoto_TC = (photo: PhotoType): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
  };
};

export const saveProfile_TC = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;
    if (response.data.resultCode === 0) {
      if (userId != null) dispatch(takeUser_TC(userId));
      else throw new Error('User has the id of null!');
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
