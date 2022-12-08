import { ICartProduct } from '../../../types/ICartProduct';

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
