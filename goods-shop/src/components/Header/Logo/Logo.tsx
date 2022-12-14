import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { resetFilter } from '../../../utils/helpers/filter/resetFilter';
import logo from './../../../assets/images/shopping-logo.png';

export const Logo: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='header__logo lg:mb-0 mb-6'>
        <Link
          to='/'
          onClick={() => resetFilter(dispatch)}
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
    </>
  );
});
Logo.displayName = 'Logo';
