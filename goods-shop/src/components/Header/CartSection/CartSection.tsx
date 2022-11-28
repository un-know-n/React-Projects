import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import Cart from './Cart/Cart';
import Profile from './Profile/Profile';

export const CartSection: FC = React.memo(() => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <div className='header__cart flex items-center lg:mt-0 mt-6'>
        {location.pathname !== '/cart' && <Cart />}
        <Profile />
      </div>
    </>
  );
});
CartSection.displayName = 'CartSection';
