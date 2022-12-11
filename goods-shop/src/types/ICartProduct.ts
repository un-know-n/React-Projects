//General type for product in cart
export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  count: number;
  category: string;
  image: string;
  additional?: string;
}

//Shows main info about the product in cart
export type TProductFilter = Pick<
  ICartProduct,
  'additional' | 'id' | 'price' | 'count'
>;

//Choose to increase or decrease product amount
export type TProductEffect = {
  effect: 'increment' | 'decrement';
};
