import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, login, email, isAuth },
});

//authUserThunkCreator
//isUserAuthorized_TC
export const isUserAuthorized_TC = () => {
  return (dispatch) => {
    authAPI.isUserAuthorized().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        let isAuth = true;
        dispatch(setAuthUserData(id, login, email, isAuth));
      } else console.log(response.data);
    });
  };
};

export const logInUser_TC = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.logIn(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(isUserAuthorized_TC());
      } else {
        // console.log(response);
        const message =
          response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Unexpected error...';
        // console.log('awdjlnadjjgsrgdsrgjlsdrgldsrg');
        dispatch(stopSubmit('login', { _error: message }));
      }
    });
  };
};

export const logOutUser_TC = () => {
  return (dispatch) => {
    authAPI.logOut().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
