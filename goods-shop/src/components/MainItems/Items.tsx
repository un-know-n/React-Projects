import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useLazyFetchProductsByFilterQuery } from '../../api/products.api';
import { defaultFilter } from '../../constants/filter';
import { useFilter } from '../../store/hooks/useFilter';
import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { setFilter } from '../../store/reducers/filter.slice';
import { Pagination } from '../UI/Pagination/Pagination';
import { ItemsSkeleton } from '../UI/Skeleton/MainItems/ItemsSkeleton';
import noProductsImg from './../../assets/images/no-products.svg';
import { Item } from './Item/Item';
import c from './Items.module.scss';

export const Items: FC = () => {
  //Take items from current filter
  const { sort, category, limit, page, query } = useFilter();

  //Get the function that filtrates products using api
  const [filterProducts, { isLoading, isError, data, error }] =
    useLazyFetchProductsByFilterQuery();

  //Number of skeletons on the page
  const skeletons = useMemo(() => {
    return Array.from({ length: limit });
  }, [limit]);

  const dispatch = useAppDispatch();

  //If something from filter changes -> call the function to fetch products
  useEffect(() => {
    filterProducts({ category, limit, query, sort, page });
  }, [sort, category, limit, page, query]);

  return (
    <>
      {data?.length ? (
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
          <Pagination
            forcePage={page}
            className={c.pagination}
            pageCount={3}
          />
        </>
      ) : (
        <>
          <div className={c.noDataWrapper}>
            <div className={c.noData}>
              <h2 className='mb-4 mt-7'>No products found 📦</h2>
              <p>
                Sorry, we have not found any products on your request. But we
                will fix that soon 😉
              </p>
              <img
                src={noProductsImg}
                alt='Empty cart'
              />
              <Link
                to='/b'
                onClick={() => dispatch(setFilter(defaultFilter))}
                className='button button--black'>
                <span>Back</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
