import React from 'react';

import emptyCartImg from './../../assets/images/empty-cart.png';

export const Empty = () => {
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
              <a
                href='/'
                className='button button--black'>
                <span>Back</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
