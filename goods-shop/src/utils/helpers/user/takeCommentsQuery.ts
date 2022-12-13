import { collection, Firestore, orderBy, query, where } from 'firebase/firestore';

export const takeCommentsQuery = (database: Firestore, productId: string) =>
  query(
    collection(database, 'comments'),
    where('productId', '==', productId),
    orderBy('createdAt', 'desc'),
  );
