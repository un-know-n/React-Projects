import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/IUser';

const initialState: IUser = {
  username: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<typeof initialState>) {
      const { email, username } = action.payload;
      email ? (state.email = email) : '';
      username ? (state.username = username) : '';
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
