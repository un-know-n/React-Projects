import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

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

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_SUCCESS:
      return { ...state, ...action.data, some: 'awdaw' }; //TODO: See what is wrong with return value type(with spread operator)
    default:
      return state;
  }
};

type SetAuthUserDataObjectType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_AUTH_USER_DATA;
  data: SetAuthUserDataObjectType;
};

export const setAuthUserData = (
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
): SetAuthUserDataType => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, login, email, isAuth },
});

type SetCaptchaType = {
  type: typeof SET_CAPTCHA_SUCCESS;
  data: Object;
};

export const setCaptcha = (captchaURL: string): SetCaptchaType => ({
  type: SET_CAPTCHA_SUCCESS,
  data: { captchaURL },
});

export const isUserAuthorized_TC = () => {
  return async (dispatch: any) => {
    const response = await authAPI.isUserAuthorized();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      let isAuth = true;
      dispatch(setAuthUserData(id, login, email, isAuth));
    } else console.log(response.data);
  };
};

export const logInUser_TC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha = null,
) => {
  return async (dispatch: any) => {
    const response = await authAPI.logIn(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
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

export const logOutUser_TC = () => {
  return async (dispatch: any) => {
    const response = await authAPI.logOut();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptcha_TC = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;
    dispatch(setCaptcha(captchaURL));
  };
};

export default authReducer;
