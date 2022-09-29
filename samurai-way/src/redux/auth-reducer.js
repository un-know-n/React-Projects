import { usersAPI } from '../api/api';

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

export const authUserThunkCreator = () => {
  return (dispatch) => {
    usersAPI.authorizeUser().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        let isAuth = true;
        dispatch(setAuthUserData(id, login, email, isAuth));
      } else console.log(response.data);
    });
  };
};

export default authReducer;
