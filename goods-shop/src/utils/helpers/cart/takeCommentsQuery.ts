import { collection, Firestore, query, where } from 'firebase/firestore';

export const takeCommentsQuery = (
  database: Firestore,
  userId: string,
  productId: string,
) =>
  query(
    collection(database, 'carts'),
    where('userId', '==', userId),
    where('productId', '==', productId),
  );
