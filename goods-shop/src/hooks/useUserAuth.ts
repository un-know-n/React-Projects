import { Auth, User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuthContext } from './useAuthContext';

export const useUserAuth = () => {
  const { auth } = useAuthContext();
  const [user, loading, error] = useAuthState(auth || ({} as Auth));
  return [user, loading, error];
};
