import { isUserAuthorized_TC } from './auth-reducer';

const INITIALIZE_SUCCESS = 'app/INITIALIZE-SUCCESS';

// type ActionType = {
//   type: string;
//   payload?: string | number;
// };

//type InitialStateType

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializeApp = () => async (dispatch: Function) => {
  await dispatch(isUserAuthorized_TC());
  await dispatch(initializeSuccess());
};

export const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS });

export default appReducer;
