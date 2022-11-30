import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { Routes } from '../../../routes';
import Cart from './Cart/Cart';
import Profile from './Profile/Profile';

export const CartSection: FC = React.memo(() => {
  const location = useLocation();

  return (
    <>
      <div className='header__cart flex items-center lg:mt-0 mt-6'>
        {location.pathname !== Routes.Cart && <Cart />}
        <Profile />
      </div>
    </>
  );
});
CartSection.displayName = 'CartSection';
