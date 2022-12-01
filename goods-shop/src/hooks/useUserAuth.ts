import { Auth } from 'firebase/auth';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AuthContext } from '../context/auth';
import { useAuthContext } from './useAuthContext';

export const useUserAuth = () => {
  const { auth } = useAuthContext();
  const [user, loading, error] = useAuthState(auth || ({} as Auth));
  return [user, loading, error];
};
