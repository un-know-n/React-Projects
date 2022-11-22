import React, { FC, useRef } from 'react';

import { useFetchAllProductsQuery } from '../../api/products.api';
import { ItemsSkeleton } from '../UI/Skeleton/MainItems/ItemsSkeleton';
import { Item } from './Item/Item';

export const Items: FC = () => {
  const { isLoading, isError, data, error } = useFetchAllProductsQuery(10);

  const someArr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <h2 className='my-7'>All items</h2>
      <div className='grid lg:gap-12 md:gap-8 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {/* <ItemsSkeleton />
        {isLoading ? (
          someArr.map((n, i) => <ItemsSkeleton key={i} />)
        ) : data ? (
          <Item
            {...data[0]}
            key={data[0].id}
          />
        ) : (
          ''
        )} */}
        {isLoading
          ? someArr.map((n, i) => <ItemsSkeleton key={i} />)
          : data?.map((item) => (
              <Item
                {...item}
                key={item.id}
              />
            ))}
      </div>
    </>
  );
};
