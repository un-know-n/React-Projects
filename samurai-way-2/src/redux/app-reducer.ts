import { isUserAuthorized_TC } from './auth-reducer';
import { GeneralThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = GeneralThunkType;

const appReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'app/INITIALIZE-SUCCESS':
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const actions = {
  initializeSuccess: () => ({
    type: 'app/INITIALIZE-SUCCESS',
  }),
};

export const initializeApp = (): ThunkType => async (dispatch: any) => {
  await dispatch(isUserAuthorized_TC());
  await dispatch(actions.initializeSuccess());
};

export default appReducer;
