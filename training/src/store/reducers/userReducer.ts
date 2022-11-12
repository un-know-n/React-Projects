import { TInferActions } from '../../types/common';
import { IUser, IUsers } from '../../types/IUsers';

const initialState: IUsers = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = (
  state = initialState,
  action: TInferActions<typeof actions>
): IUsers => {
  switch (action.type) {
    case 'users/FETCH_USERS':
      return { ...state, users: action.payload };

    case 'users/SET_LOADING':
      return { ...state, loading: action.payload };

    case 'users/SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const actions = {
  fetchUsers: (users: IUser[]) =>
    ({ type: 'users/FETCH_USERS', payload: users } as const),
  setLoading: (loading: boolean) =>
    ({ type: 'users/SET_LOADING', payload: loading } as const),
  setError: (error: string) =>
    ({ type: 'users/SET_ERROR', payload: error } as const),
};
