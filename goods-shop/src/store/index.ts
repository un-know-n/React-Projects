import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { productsAPI } from '../api/products.api';
import { cartSlice } from './reducers/cart.slice';
import { filterSlice } from './reducers/filter.slice';

export const rootReducer = combineReducers({
  filter: filterSlice.reducer,
  cart: cartSlice.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
});

//* Redux-Persist for localStorage

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsAPI.middleware),
});

// eslint-disable-next-line prefer-const
export let persistor = persistStore(store);

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = typeof store;
export type TAppDispatch = TAppStore['dispatch'];
