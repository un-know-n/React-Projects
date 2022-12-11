import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import { productsAPI } from '../api/products.api';
import { cartSlice } from './reducers/cart.slice';
import { filterSlice } from './reducers/filter.slice';
import userSlice from './reducers/user.slice';

//Main app reducer
export const rootReducer = combineReducers({
  filter: filterSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
});

//* Redux-Persist for sessionStorage

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
  blacklist: ['filter', 'productsAPI', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//* Main Store

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsAPI.middleware),
  //getDefaultMiddleware().concat(productsAPI.middleware),
});

// Main exported variables
export const persistor = persistStore(store);

// Types from redux
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = typeof store;
export type TAppDispatch = TAppStore['dispatch'];
