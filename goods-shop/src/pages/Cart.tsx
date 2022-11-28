import React, { lazy, Suspense } from 'react';

import Empty from '../components/CartEmpty/Empty';
import { Inner } from '../components/CartInner/Inner';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { takeCartItems } from '../store/selectors/cart.selector';

const Cart = () => {
  const items = useTypedSelector(takeCartItems);
  return <>{items.length ? <Inner /> : <Empty />}</>;
};

export default Cart;
