import { collection, Firestore, limit, orderBy, query, where } from 'firebase/firestore';

export const takeCommentsQuery = (database: Firestore, productId: string) =>
  query(
    collection(database, 'comments'),
    where('productId', '==', productId),
    orderBy('createdAt', 'desc'),
  );
