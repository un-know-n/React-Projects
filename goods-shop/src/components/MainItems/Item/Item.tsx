import React, { FC, useCallback } from 'react';

import { IProduct } from '../../../types/IProduct';
import c from './Item.module.scss';

export const Item: FC<IProduct> = ({
  image,
  title,
  rating: { count, rate },
  price,
}) => {
  const returnStars = useCallback(
    (rate: number) => {
      const amount = Math.ceil(rate);
      return Array.from(Array(amount).keys()).map((s) => '⭐');
    },
    [rate],
  );

  return (
    <>
      <div className=' w-full text-center mb-7'>
        <img
          className='w-full'
          src={image}
          alt='Pizza'
        />
        <h4 className='text-xl my-3'>{title}</h4>
        <div className={c.item__selector}>
          <div>
            <span>{returnStars(rate)}</span>
            <span>
              {count} <sub>left</sub>
            </span>
          </div>
          <ul>
            <li className={c.active}>XS</li>
            <li>XM</li>
            <li>XL</li>
          </ul>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <div className='text-2xl font-bold'>{price} - $</div>
          <button className='button button--outline button--add '>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Add</span>
            <i>[0]</i>
          </button>
        </div>
      </div>
    </>
  );
};
