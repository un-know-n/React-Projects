import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import usersReducer from './reducers/usersSlice';

export const rootReducer = combineReducers({
  users: usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
