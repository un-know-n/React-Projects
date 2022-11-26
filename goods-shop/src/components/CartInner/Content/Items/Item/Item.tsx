import React, { FC } from 'react';

import { useAppDispatch } from '../../../../../store/hooks/useTypedDispatch';
import { editItem, removeItem } from '../../../../../store/reducers/cart.slice';
import { ICartProduct } from '../../../../../types/ICartProduct';

type TProps = {
  item: ICartProduct;
};

export const Item: FC<TProps> = ({ item }) => {
  const { id, title, additional, price, image, count, category } = item;

  const dispatch = useAppDispatch();

  //Increment item in cart
  const handleMore = () =>
    dispatch(editItem({ id, additional, effect: 'increment', price, count }));

  //Decrement item in cart
  const handleLess = () =>
    dispatch(editItem({ id, additional, effect: 'decrement', price, count }));

  //Remove item in cart
  const handleRemove = () =>
    dispatch(removeItem({ id, additional, price, count }));

  return (
    <>
      <div className='cart__item md:flex-row flex-col items-center md:text-left text-center'>
        <div className='cart__item-img'>
          <img
            src={image}
            alt=''
          />
        </div>
        <div className='cart__item-info'>
          <h3>{title}</h3>
          <p>{`${category} / ${additional}`}</p>
        </div>
        <div className='flex sm:flex-row flex-col items-center '>
          <div className='cart__item-count'>
            <div
              className='button button--outline button--circle cart__item-count-minus'
              onClick={handleLess}>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                  fill='#EB5A1E'
                />
                <path
                  d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                  fill='#EB5A1E'
                />
              </svg>
            </div>
            <div className='cart__item-count-amount'>
              <b>{count}</b>
            </div>
            <div
              className='button button--outline button--circle cart__item-count-plus'
              onClick={handleMore}>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                  fill='#EB5A1E'
                />
                <path
                  d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                  fill='#EB5A1E'
                />
              </svg>
            </div>
          </div>
          <div className='cart__item-price sm:my-0 my-3'>
            <b>{price} $</b>
          </div>
          <div
            className='cart__item-remove'
            onClick={handleRemove}>
            <div className='button button--outline button--circle'>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                  fill='#EB5A1E'
                />
                <path
                  d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                  fill='#EB5A1E'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
