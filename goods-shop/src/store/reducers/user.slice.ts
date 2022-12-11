import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/IUser';

const initialState: IUser = {
  username: '',
  email: '',
  commentsDocumentId: '',
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<typeof initialState>) {
      const {
        email,
        username,
        commentsDocumentId: cartDocumentId,
        userId,
      } = action.payload;
      email ? (state.email = email) : '';
      username ? (state.username = username) : '';
      userId ? (state.userId = userId) : '';
      cartDocumentId ? (state.commentsDocumentId = cartDocumentId) : '';
    },
    setDocument(state, action: PayloadAction<string>) {
      state.commentsDocumentId = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
