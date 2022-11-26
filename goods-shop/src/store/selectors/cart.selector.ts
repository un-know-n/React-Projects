import { TRootState } from '..';

export const takeCartItems = (state: TRootState) => state.cart.items;

export const takeTotalPrice = (state: TRootState) => state.cart.totalPrice;

export const takeTotalAmount = (state: TRootState) => state.cart.totalAmount;
