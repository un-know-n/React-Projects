import React, { FC, useEffect, useMemo, useRef } from 'react';

import { useLazyFetchProductsByFilterQuery } from '../../api/products.api';
import { useFilter } from '../../store/hooks/useFilter';
import { ItemsSkeleton } from '../UI/Skeleton/MainItems/ItemsSkeleton';
import { Item } from './Item/Item';

export const Items: FC = () => {
  //const { isLoading, isError, data, error } = useFetchAllProductsQuery(10);

  const { sort, category, limit, page, query } = useFilter();

  const [filterProducts, { isLoading, isError, data, error }] =
    useLazyFetchProductsByFilterQuery();

  const skeletons = useMemo(() => {
    return Array.from({ length: limit });
  }, [limit]);

  useEffect(() => {
    filterProducts({ category, limit, query, sort, page });
  }, [sort, category, limit, page, query]);

  return (
    <>
      <h2 className='my-7'>
        {category[0].toUpperCase() + category.substring(1)}
      </h2>
      <div className='grid lg:gap-12 md:gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {isLoading
          ? skeletons.map((n, i) => <ItemsSkeleton key={i} />)
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
