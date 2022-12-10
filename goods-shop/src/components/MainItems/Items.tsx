import * as Lodash from 'lodash';
import qs from 'qs';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyFetchProductsByFilterQuery } from '../../api/products.api';
import { defaultFilter } from '../../constants/filter';
import { useFilter } from '../../store/hooks/useFilter';
import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { setFilter } from '../../store/reducers/filter.slice';
import { IFilter } from '../../types/IFilter';
import NoData from '../UI/NoData/NoData';
import { ItemsSkeleton } from '../UI/Skeleton/MainItems/ItemsSkeleton';
import { Item } from './Item/Item';

//TODO: Handle the errors from server!

export const Items: FC = () => {
  //Take items from current filter
  const { sort, category, limit, page, query } = useFilter();
  const navigate = useNavigate();

  const isMounted = useRef(false);

  //Get the function that filtrates products using api
  const [filterProducts, { isLoading, isFetching, isSuccess, data }] =
    useLazyFetchProductsByFilterQuery();

  //Number of skeletons on the page
  const skeletons = useMemo(() => {
    return Array.from({ length: limit });
  }, [limit]);

  const dispatch = useAppDispatch();

  //Take the options from URL for filter, when first render
  useEffect(() => {
    if (window.location.search) {
      //Take the string from URL
      const filterParams = qs.parse(window.location.search.substring(1));
      //TODO: Fix the following filter issue
      // eslint-disable-next-line prefer-const
      let { _limit, _page, _sort, category, q } = filterParams;
      category = category || 'all';
      q = query || '';

      //Dispatch the object with needed structure
      dispatch(
        setFilter({
          category,
          query: q,
          sort: _sort,
          limit: _limit,
          page: _page,
        } as unknown as IFilter),
      );
    }
  }, []);

  //Push the filter options to URL, after first redraw
  useEffect(() => {
    //If first render has already happened and filter has changed
    if (
      isMounted.current &&
      !Lodash.isEqual({ sort, category, limit, page, query }, defaultFilter)
    ) {
      //Put every parameter into object and push it to URL
      const filterParams = qs.stringify({
        _sort: sort,
        ...(category !== 'all' && { category }),
        _limit: limit,
        _page: page,
        ...(query !== '' && { q: query }),
      });
      navigate(`?${filterParams}`);
    }

    isMounted.current = true;
  }, [sort, category, limit, page, query, isMounted.current]);

  //If something from filter changes -> call the function to fetch products
  useEffect(() => {
    //Fetch products when filter is ready
    //if (isMounted.current) {
    filterProducts({ category, limit, query, sort, page });
    //}
  }, [sort, category, limit, page, query, isMounted.current]);

  return (
    <>
      <>
        <h2 className='my-7 text-4xl'>
          {category !== undefined &&
            category[0].toUpperCase() + category.substring(1)}
        </h2>
        <div
          className={
            isLoading || isFetching || (isSuccess && data?.length)
              ? 'grid lg:gap-12 md:gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
              : 'flex justify-center items-center'
          }>
          {isLoading || isFetching ? (
            skeletons.map((n, i) => <ItemsSkeleton key={i} />)
          ) : isSuccess && data?.length ? (
            data?.map((item) => (
              <Item
                {...item}
                key={item.id}
              />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </>
    </>
  );
};
