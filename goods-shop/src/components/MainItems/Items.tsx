import * as Lodash from 'lodash';
import qs from 'qs';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLazyFetchProductsByFilterQuery } from '../../api/products.api';
import { defaultFilter } from '../../constants/filter';
import { useFilter } from '../../store/hooks/useFilter';
import { useAppDispatch } from '../../store/hooks/useTypedDispatch';
import { setFilter } from '../../store/reducers/filter.slice';
import { IFilter } from '../../types/IFilter';
import { resetFilter } from '../../utils/resetFilter';
import { Pagination } from '../UI/Pagination/Pagination';
import { ItemsSkeleton } from '../UI/Skeleton/MainItems/ItemsSkeleton';
import noProductsImg from './../../assets/images/no-products.svg';
import { Item } from './Item/Item';
import c from './Items.module.scss';

export const Items: FC = () => {
  //Take items from current filter
  const { sort, category, limit, page, query } = useFilter();
  const navigate = useNavigate();

  const isMounted = useRef(false);
  const isSearch = useRef(false);

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
    //Fetch products when filter is ready
    if (isMounted.current) {
      filterProducts({ category, limit, query, sort, page });
    }
  }, [sort, category, limit, page, query]);

  //Take the options from URL for filter, when first render
  useEffect(() => {
    if (window.location.search) {
      //Take the string from URL
      const filterParams = qs.parse(window.location.search.substring(1));
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
  }, [sort, category, limit, page, query]);

  return (
    <>
      {data?.length ? (
        <>
          <h2 className='my-7'>
            {category !== undefined &&
              category[0].toUpperCase() + category.substring(1)}
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
                to='/'
                onClick={() => resetFilter(dispatch)}
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
