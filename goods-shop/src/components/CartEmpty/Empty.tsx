import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../routes';
import emptyCartImg from './../../assets/images/empty-cart.png';

const Empty = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='content'>
          <div className='container container--cart'>
            <div className='cart cart--empty'>
              <h2>Cart is empty 🛒</h2>
              <p>
                It seems, that you have not ordered any product yet. But you can
                fix it anytime 😉
              </p>
              <img
                src={emptyCartImg}
                alt='Empty cart'
              />
              <Link
                to={Routes.Home}
                className='button button--black'>
                <span>Back</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empty;
