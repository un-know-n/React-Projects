import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { setQuery } from '../../store/reducers/filter.slice';
import { takeQuery } from '../../store/selectors/filter.selector';
import logo from './../../assets/images/shopping-logo.png';
import c from './Header.module.scss';

export const Header: FC = () => {
  const query = useTypedSelector(takeQuery);
  const dispatch = useAppDispatch();

  return (
    <>
      <header className='header'>
        <div className='container flex lg:flex-row flex-col '>
          <div className='header__logo lg:mb-0 mb-6'>
            <Link
              to='/'
              className='flex'>
              <img
                src={logo}
                className='App-logo'
                alt='logo'
                width={60}
              />
              <div>
                <h1>Goods shop</h1>
                <p>Things for every occasion</p>
              </div>
            </Link>
          </div>
          <div className={c.header__search}>
            <svg
              className={c.search__svg}
              id='Layer_1'
              version='1.1'
              viewBox='0 0 512 512'>
              <path d='M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z' />
            </svg>
            <input
              value={query}
              type='text'
              onChange={(event) => dispatch(setQuery(event.target.value))}
              className={c.input__search}
              placeholder='Find item...'
            />
            {query && (
              <svg
                className={c.close__svg}
                version='1.1'
                viewBox='0 0 24 24'
                onClick={() => dispatch(setQuery(''))}>
                <path d='M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z' />
              </svg>
            )}
          </div>
          <div className='header__cart flex items-center lg:mt-0 mt-6'>
            <Link
              to='/cart'
              className='button button--cart'>
              <span>[Price] - $</span>
              <div className='button__delimiter'></div>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z'
                  stroke='white'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z'
                  stroke='white'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669'
                  stroke='white'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>[10]</span>
            </Link>
            <Link to='/profile'>
              <div className={c.user}>
                <svg
                  className={c.user__icon}
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z' />
                  <path d='M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z' />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
