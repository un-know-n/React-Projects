import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICart } from '../../types/ICart';
import { ICartProduct, TProductEffect, TProductFilter } from '../../types/ICartProduct';

const initialState: ICart = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<ICartProduct>) {
      state.items.push(action.payload);
      performState(state, action.payload.price, 'increment');
    },
    editItem(state, action: PayloadAction<TProductFilter & TProductEffect>) {
      const { id, additional, effect } = action.payload;
      state.items.map((item) => {
        if (item.id === id && item.additional === additional) {
          if (effect === 'increment') {
            item.count += 1;
            performState(state, item.price, effect);
          } else {
            if (item.count > 1) {
              item.count -= 1;
              performState(state, item.price, effect);
            }
          }
        }
      });
    },
    removeItem(state, action: PayloadAction<TProductFilter>) {
      const { id, additional, price, count } = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === id && item.additional === additional,
      );
      if (index || index === 0) {
        state.items.splice(index, 1);
        state.totalAmount -= count;
        state.totalPrice -= count * price;
        state.totalPrice = Number(state.totalPrice.toFixed(2));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
  },
});

const performState = (
  state: typeof initialState,
  price: number,
  effect: 'increment' | 'decrement',
) => {
  if (effect === 'increment') {
    state.totalAmount += 1;
    state.totalPrice += price;
  } else {
    state.totalAmount -= 1;
    state.totalPrice -= price;
  }
  state.totalPrice = Number(state.totalPrice.toFixed(2));
};

export const { editItem, removeItem, setItem, clearCart } = cartSlice.actions;

export default cartSlice;
