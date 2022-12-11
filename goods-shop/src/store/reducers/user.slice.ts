import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/IUser';

const initialState: IUser = {
  username: '',
  email: '',
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<typeof initialState>) {
      const { email, username, userId } = action.payload;
      email ? (state.email = email) : '';
      username ? (state.username = username) : '';
      userId ? (state.userId = userId) : '';
    },
    clearUser(state) {
      state.email = '';
      state.username = '';
      state.userId = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice;
