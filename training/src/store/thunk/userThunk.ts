import axios from 'axios';
import { Dispatch } from 'redux';

import { TInferActions } from '../../types/common';
import { IUser } from '../../types/IUsers';
import { actions } from '../reducers/userReducer';

export const fetchUsersT = () => {
  return async (dispatch: Dispatch<TInferActions<typeof actions>>) => {
    try {
      dispatch(actions.setLoading(true));
      await axios
        .get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => dispatch(actions.fetchUsers(res.data)));
      dispatch(actions.setLoading(false));
    } catch (error) {
      dispatch(actions.setLoading(false));
      dispatch(actions.setError('Error during users fetching... :( '));
    }
  };
};
