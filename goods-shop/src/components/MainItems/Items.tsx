import React from 'react';

import { Item } from './Item/Item';

export const Items = () => {
  return (
    <>
      <h2 className='content__title'>All items</h2>
      <div className='content__items'>
        <Item />
      </div>
    </>
  );
};
