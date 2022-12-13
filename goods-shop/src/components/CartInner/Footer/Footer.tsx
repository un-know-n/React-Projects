import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { clearCart } from '../../../store/reducers/cart.slice';
import { takeTotalAmount, takeTotalPrice } from '../../../store/selectors/cart.selector';
import { successToast } from '../../../utils/helpers/toasts';

export const Footer = () => {
  const amount = useTypedSelector(takeTotalAmount);
  const price = useTypedSelector(takeTotalPrice);

  const dispatch = useAppDispatch();

  const onSuccess = () => {
    successToast('Thank you for your purchase! 😊');
    dispatch(clearCart());
  };

  return (
    <>
      <div className='cart__bottom'>
        <div className='cart__bottom-details md:flex-row flex-col text-center'>
          <span>
            Total amount: <b>{amount} pcs.</b>
          </span>
          <span>
            Order price: <b>{price} $</b>
          </span>
        </div>
        <div className='cart__bottom-buttons flex flex-col-reverse sm:flex-row items-center'>
          <Link
            to='/'
            className='button button--outline button--add go-back-btn sm:mt-0 mt-4'>
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M7 13L1 6.93015L6.86175 1'
                stroke='#D3D3D3'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <span>Back</span>
          </Link>
          <Link
            to={Routes.Home}
            onClick={onSuccess}>
            <div className='button pay-btn'>
              <span>Buy now</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
