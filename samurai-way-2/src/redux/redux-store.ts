import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import dialogReducer from './dialog-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';

let RootReducer = combineReducers({
  profile: profileReducer,
  messages: dialogReducer,
  users: usersReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any },
> = ReturnType<PropertiesTypes<T>>;

//ReturnType<SomeType<typeof actions>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
