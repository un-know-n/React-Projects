import { useMemo } from 'react';

import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { takeCartItems } from '../store/selectors/cart.selector';
import { findCartItem } from '../utils/helpers/cart/findCartItem';

/**
 * Take item from the cart
 *
 * @param selectedSize - size of the product
 * @param id - id of the product
 * @returns item from the cart
 */
export const useCartItem = (selectedSize: string, id: number) => {
  const cartItems = useTypedSelector(takeCartItems);
  const cartItem = useMemo(
    () => findCartItem(cartItems, id, selectedSize),
    [selectedSize, cartItems],
  );
  return cartItem ?? null;
};
