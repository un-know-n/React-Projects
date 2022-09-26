import { combineReducers, legacy_createStore as createStore } from 'redux';
import profileReducer from './profile-reducer';
import dialogReducer from './dialog-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
  profile: profileReducer,
  messages: dialogReducer,
  users: usersReducer,
  sidebar: sidebarReducer,
});

let store = createStore(reducers);

export default store;
