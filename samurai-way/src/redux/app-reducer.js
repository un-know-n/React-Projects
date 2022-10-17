import { isUserAuthorized_TC } from './auth-reducer';

const INITIALIZE_SUCCESS = 'app/INITIALIZE-SUCCESS';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializeApp = () => async (dispatch) => {
  await dispatch(isUserAuthorized_TC());
  await dispatch(initializeSuccess());
};

export const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS });

export default appReducer;
