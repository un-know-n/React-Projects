import React, { FC, memo, useCallback, useContext, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../context/auth';
import { useCartItem } from '../../../hooks/useCartItem';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { editItem, setItem } from '../../../store/reducers/cart.slice';
import { IProduct } from '../../../types/IProduct';
import { addToCart } from '../../../utils/helpers/cart/addToCart';
import { composePrice } from '../../../utils/helpers/product/composePrice';
import { takePriceFactor } from '../../../utils/helpers/product/takePriceFactor';
import { returnStars } from '../../../utils/helpers/UI/returnStars';
import AddToCart from './../../UI/Buttons/AddToCart';
import c from './Item.module.scss';

export const Item: FC<IProduct> = memo(
  ({ image, title, rating: { count, rate }, price, size, id, category }) => {
    const realSize = size![0] || '';
    const [selectedSize, setSelectedSize] = useState(realSize);

    const cartItem = useCartItem(selectedSize, id);

    const [user, loading, error] = useUserAuth();

    const dispatch = useAppDispatch();

    const memoizedStars = useMemo(() => returnStars(rate), [rate]);

    const realPrice = composePrice(price, selectedSize, size);

    //TODO: Make different price, depending on the additional value(another size -> item with another id and so on...)

    return (
      <>
        <div className='w-full text-center mb-7'>
          <Link to={`/product/${id}`}>
            <img
              className='w-auto
          h-60 block m-auto'
              src={image}
              alt='Pizza'
            />

            <h4 className='text-xl my-3 truncate'>{title}</h4>
          </Link>

          <div className={c.item__selector}>
            <div>
              <span>{memoizedStars}</span>
              <span>
                {count} <sub>left</sub>
              </span>
            </div>
            <ul>
              {size?.map((s) => (
                <li
                  key={s}
                  className={s === selectedSize ? c.active : ''}
                  onClick={() => setSelectedSize(s)}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center justify-between mt-5'>
            <div className='text-2xl font-bold'>{realPrice} $</div>
            <Link to={!user ? Routes.SignIn : ''}>
              <AddToCart
                isDisabled={!user}
                onClickCallback={() =>
                  addToCart(dispatch, cartItem, selectedSize, {
                    id,
                    title,
                    price: realPrice,
                    category,
                    image,
                  })
                }
                itemCartCounter={cartItem?.count || 0}
              />
            </Link>
          </div>
        </div>
      </>
    );
  },
);
Item.displayName = 'Item';
