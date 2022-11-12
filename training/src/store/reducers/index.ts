import { combineReducers } from 'redux';

import { usersReducer } from './userReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
