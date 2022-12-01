import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { useContext } from 'react';

import { AuthContext } from '../context/auth';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const auth = context?.auth || ({} as Auth);
  const firestore = context?.firestore || ({} as Firestore);
  return { auth, firestore };
};
