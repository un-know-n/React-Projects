import { stopSubmit } from 'redux-form';

import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { ResultCodes } from '../shared/types/reducer-types';
import { GeneralThunkType, InferActionsTypes } from './redux-store';

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA';
const SET_CAPTCHA_SUCCESS = 'auth/SET-CAPTCHA-SUCCESS';

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaURL: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = GeneralThunkType;

const authReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
  ) => ({
    type: SET_AUTH_USER_DATA,
    data: { userId, login, email, isAuth },
  }),

  setCaptcha: (captchaURL: string) => ({
    type: SET_CAPTCHA_SUCCESS,
    data: { captchaURL },
  }),
};

// type SetAuthUserDataObjectType = {
//   userId: number | null;
//   login: string | null;
//   email: string | null;
//   isAuth: boolean;
// };

export const isUserAuthorized_TC = (): ThunkType => {
  return async (dispatch) => {
    const data = await authAPI.isUserAuthorized();
    if (data.resultCode === ResultCodes.Success) {
      let { id, login, email } = data.data;
      let isAuth = true;
      dispatch(actions.setAuthUserData(id, login, email, isAuth));
    } else console.log(data);
  };
};

export const logInUser_TC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null = null,
): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logIn(email, password, rememberMe, captcha);
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(isUserAuthorized_TC());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptcha_TC());
      }
      const message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Unexpected error...';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };
};

export const logOutUser_TC = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logOut();
    if (response.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptcha_TC = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;
    dispatch(actions.setCaptcha(captchaURL));
  };
};

export default authReducer;
