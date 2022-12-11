import { TAppDispatch } from '../../../store';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { editItem, setItem } from '../../../store/reducers/cart.slice';
import { ICartProduct } from '../../../types/ICartProduct';

/**
 * Add item to cart or increase it's amount(if item is already there)
 *
 * @param dispatch - app dispatch
 * @param cartItem - item from the cart, if exists
 * @param selectedSize - item size
 * @param currentItem - item, which needs to be added to cart
 */
export const addToCart = (
  dispatch: TAppDispatch,
  cartItem: ICartProduct | null,
  selectedSize: string,
  currentItem: Pick<
    ICartProduct,
    'id' | 'title' | 'price' | 'category' | 'image'
  >,
) => {
  const { id, title, price, category, image } = currentItem;
  if (cartItem) {
    dispatch(
      editItem({
        id: cartItem.id,
        additional: selectedSize,
        effect: 'increment',
        price: cartItem.price,
        count: cartItem.count,
      }),
    );
  } else
    dispatch(
      setItem({
        id,
        title,
        price,
        count: 1,
        additional: selectedSize,
        category,
        image,
      }),
    );
};

export type TAddToCart = typeof addToCart;
