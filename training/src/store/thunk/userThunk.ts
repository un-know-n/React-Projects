import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getErrorType } from '../../helpers/getErrorType';
import { IUser } from '../../types/IUsers';

// export const fetchUsersT = () => {
//   return async (dispatch: Dispatch<TInferActions<typeof actions>>) => {
//     try {
//       dispatch(actions.setLoading(true));
//       await axios
//         .get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
//         .then((res) => dispatch(actions.fetchUsers(res.data)));
//       dispatch(actions.setLoading(false));
//     } catch (error) {
//       dispatch(actions.setLoading(false));
//       dispatch(actions.setError('Error during users fetching... :( '));
//     }
//   };
// };

//* Another variant with the slice from Redux Toolkit
// export const fetchUsersT = () => {
//   return async (dispatch: TAppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       await axios
//         .get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
//         .then((res) => dispatch(setUsers(res.data)));
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setLoading(false));
//       dispatch(setError(getErrorType(error)));
//     }
//   };
// };

export const fetchUsersAsyncT = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IUser[]>(
        `https://jsonplaceholder.typicode.com/users`
      );
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(getErrorType(error));
    }
  }
);
