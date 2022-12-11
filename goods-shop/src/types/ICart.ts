import { ICartProduct } from './ICartProduct';

//General cart type
export interface ICart {
  items: ICartProduct[];
  totalPrice: number;
  totalAmount: number;
}
