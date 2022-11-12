export interface IUsers {
  users: IUser[];
  loading: boolean;
  error: null | string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

//* Just for test(but need to do personal type for every action and create general type to store them --> code duplicating...)
export interface IUsersActions {
  type: string;
  payload?: unknown;
}

//Another variant to store the constants
export enum UserActionTypes {
  FETCH_USERS = 'FETCH_USERS',
}
//*
