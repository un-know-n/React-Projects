import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

//General type for main context
export interface IAuthContext {
  auth: Auth;
  db: Firestore;
}
