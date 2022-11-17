import React from 'react';

import { Empty } from '../components/CartEmpty/Empty';
import { Inner } from '../components/CartInner/Inner';

export const Cart = () => {
  return (
    <>
      <Inner />
      <Empty />
    </>
  );
};
