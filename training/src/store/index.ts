import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { usersAPI } from '../api/usersAPI';

export const rootReducer = combineReducers({
  //users: usersReducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersAPI.middleware),
  });
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
