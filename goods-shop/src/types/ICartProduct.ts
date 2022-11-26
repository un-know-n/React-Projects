export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  count: number;
  category: string;
  image: string;
  additional?: string;
}

export type TProductFilter = Pick<
  ICartProduct,
  'additional' | 'id' | 'price' | 'count'
>;

export type TProductEffect = {
  effect: 'increment' | 'decrement';
};
