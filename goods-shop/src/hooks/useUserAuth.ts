import { Auth, User } from 'firebase/auth';
import { AuthStateHook, useAuthState } from 'react-firebase-hooks/auth';

import { useAuthContext } from './useAuthContext';

/**
 * Take user from Firebase
 *
 * @returns typed useAuthState(...) values
 */
export const useUserAuth = () => {
  const { auth } = useAuthContext();
  const [user, loading, error] = useAuthState(auth || ({} as Auth));
  return [user, loading, error] as AuthStateHook;
};
