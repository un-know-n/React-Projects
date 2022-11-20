import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productsAPI } from '../api/products.api';
import { filterSlice } from './reducers/filter.slice';

export const rootReducer = combineReducers({
  filter: filterSlice.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsAPI.middleware),
  });
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
