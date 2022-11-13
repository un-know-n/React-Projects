import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchUsersAsyncT = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IUser[]>(
        `https://jsonplaceholder.typicode.com/users`
      );
      return response.data;
    } catch (error: any) {
      thunkApi.rejectWithValue(error.messages);
    }
  }
);
