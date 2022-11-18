import React, { FC, useRef } from 'react';

import { Item } from './Item/Item';

export const Items: FC = () => {
  const someData = useRef([1, 2, 3, 4, 5, 6]);

  return (
    <>
      <h2 className='my-7'>All items</h2>
      <div className='grid grid-cols-4 gap-12'>
        {someData.current.map((item) => (
          <Item key={item} />
        ))}
      </div>
    </>
  );
};
