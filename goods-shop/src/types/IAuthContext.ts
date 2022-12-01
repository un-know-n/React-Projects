import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface IAuthContext {
  auth: Auth;
  firestore: Firestore;
}
