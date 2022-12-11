import { ICartProduct } from '../../../types/ICartProduct';

/**
 * Find specific cart item, depending on params
 *
 * @param items - array of cart items
 * @param id - id of the wanted item
 * @param selectedSize - size of the item
 * @returns item
 */
export const findCartItem = (
  items: ICartProduct[],
  id: number,
  selectedSize: string,
) => {
  if (items.length > 0) {
    return items.find(
      (item) => item.id === id && item.additional === selectedSize,
    );
  } else return null;
};
