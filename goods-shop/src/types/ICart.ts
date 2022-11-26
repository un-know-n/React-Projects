import { ICartProduct } from './ICartProduct';

export interface ICart {
  items: ICartProduct[];
  totalPrice: number;
  totalAmount: number;
}
