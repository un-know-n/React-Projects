import { useMemo } from 'react';

import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { takeCartItems } from '../store/selectors/cart.selector';
import { findCartItem } from '../utils/helpers/findCartItem';

export const useCartItem = (selectedSize: string, id: number) => {
  const cartItems = useTypedSelector(takeCartItems);
  const cartItem = useMemo(
    () => findCartItem(cartItems, id, selectedSize),
    [selectedSize, cartItems],
  );
  if (cartItem) return cartItem;
  return null;
};
