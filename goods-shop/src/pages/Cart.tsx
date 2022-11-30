import React, { lazy, Suspense } from 'react';

import Empty from '../components/CartEmpty/Empty';
import { Inner } from '../components/CartInner/Inner';
import Layout from '../components/UI/Layout/Layout';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { takeCartItems } from '../store/selectors/cart.selector';

const Cart = () => {
  const items = useTypedSelector(takeCartItems);
  return (
    <>
      <Layout includeHeader>{items.length ? <Inner /> : <Empty />}</Layout>
    </>
  );
};

export default Cart;
