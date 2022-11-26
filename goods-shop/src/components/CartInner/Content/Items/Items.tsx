import React from 'react';

import { useTypedSelector } from '../../../../store/hooks/useTypedSelector';
import { takeCartItems } from '../../../../store/selectors/cart.selector';
import { Item } from './Item/Item';

export const Items = () => {
  const items = useTypedSelector(takeCartItems);

  return (
    <>
      <div className='content__items'>
        {items.map((item, i) => (
          <Item
            item={item}
            // key={item.id}
            key={i}
          />
        ))}
      </div>
    </>
  );
};
