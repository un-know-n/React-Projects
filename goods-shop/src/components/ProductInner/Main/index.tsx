import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../routes';
import { IProductRating } from '../../../types/IProduct';
import { returnStars } from '../../../utils/helpers/UI/returnStars';

type TProps = {
  rating: IProductRating;
  cartCount: number;
  image: string;
};

const ProductMain: FC<TProps> = ({ image, cartCount, rating: { rate } }) => {
  const memoizedStars = useMemo(() => returnStars(rate), [rate]);

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
          <button className='button button--outline button--add'>
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
            <i>{cartCount || 0}</i>
          </button>
          <Link
            to={Routes.Home}
            className='border border-blue-500 rounded-full text-center hover:bg-blue-500 hover:text-white transition-all py-2'>
            <button>Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductMain;
