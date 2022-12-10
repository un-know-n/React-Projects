import React, { FC, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useCartItem } from '../../../hooks/useCartItem';
import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { IProduct, IProductRating } from '../../../types/IProduct';
import { addToCart } from '../../../utils/helpers/cart/addToCart';
import { returnStars } from '../../../utils/helpers/UI/returnStars';
import AddToCart from '../../UI/Buttons/AddToCart';

type TProps = Pick<
  IProduct,
  'id' | 'image' | 'rating' | 'category' | 'price' | 'title'
> & { size: string };

const ProductMain: FC<TProps> = memo(
  ({ image, rating: { rate }, size, id, title, category, price }) => {
    const memoizedStars = useMemo(() => returnStars(rate), [rate]);

    const cartItem = useCartItem(size, id);
    const dispatch = useAppDispatch();

    return (
      <>
        <div className='product__main flex flex-col items-center justify-center'>
          <div className='main__image w-2/3 md:w-full md:max-w-xs shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.3)] shadow-slate-300 rounded-t-xl p-2'>
            <img
              src={image}
              alt='Product image'
            />
          </div>
          <div className='main__rating w-2/3 md:w-full p-2 shadow-lg shadow-slate-300 rounded-b-xl mb-5'>
            <h3>Rating: {memoizedStars}</h3>
          </div>
          <div className='main__buttons w-auto flex flex-col justify-center space-y-3'>
            <AddToCart
              onClickCallback={() =>
                addToCart(dispatch, cartItem, size, {
                  id,
                  title,
                  price,
                  category,
                  image,
                })
              }
              itemCartCounter={cartItem?.count || 0}
            />
            <Link
              to={Routes.Home}
              className='border border-blue-500 rounded-full text-center hover:bg-blue-500 hover:text-white transition-all py-2'>
              <button>Back</button>
            </Link>
          </div>
        </div>
      </>
    );
  },
);

ProductMain.displayName = 'ProductMain';

export default ProductMain;
