import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA';
const SET_CAPTCHA_SUCCESS = 'auth/SET-CAPTCHA-SUCCESS';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isFetching: false,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, login, email, isAuth },
});

export const setCaptcha = (captchaURL) => ({
  type: SET_CAPTCHA_SUCCESS,
  data: { captchaURL },
});

export const isUserAuthorized_TC = () => {
  return async (dispatch) => {
    const response = await authAPI.isUserAuthorized();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      let isAuth = true;
      dispatch(setAuthUserData(id, login, email, isAuth));
    } else console.log(response.data);
  };
};

export const logInUser_TC = (email, password, rememberMe, captcha = null) => {
  return async (dispatch) => {
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
  return async (dispatch) => {
    const response = await authAPI.logOut();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptcha_TC = () => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;
    dispatch(setCaptcha(captchaURL));
  };
};

export default authReducer;
