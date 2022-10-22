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

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializeApp = () => async (dispatch: any) => {
  await dispatch(isUserAuthorized_TC());
  await dispatch(initializeSuccess());
};

type InitializeSuccessType = {
  type: typeof INITIALIZE_SUCCESS;
};

export const initializeSuccess = (): InitializeSuccessType => ({
  type: INITIALIZE_SUCCESS,
});

export default appReducer;
