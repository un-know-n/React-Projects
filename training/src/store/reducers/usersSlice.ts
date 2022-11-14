import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUsers } from '../../types/IUsers';
import { fetchUsersAsyncT } from '../thunk/userThunk';

const initialState: IUsers = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setError(state, action: PayloadAction<string>) {
    //   state.error = action.payload;
    // },
    // setLoading(state, action: PayloadAction<boolean>) {
    //   state.loading = action.payload;
    // },
    // setUsers(state, action: PayloadAction<IUser[]>) {
    //   state.users = action.payload;
    // },
  },
  extraReducers: {
    [fetchUsersAsyncT.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
    },
    [fetchUsersAsyncT.pending.type]: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    [fetchUsersAsyncT.fulfilled.type]: (
      state,
      action: PayloadAction<IUser[]>
    ) => {
      state.users = action.payload;
    },
  },
});

//export const { setError, setLoading, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
