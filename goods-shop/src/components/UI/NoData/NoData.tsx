import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../routes';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { resetFilter } from '../../../utils/helpers/filter/resetFilter';
import noProductsImg from './../../../assets/images/no-products.svg';
import c from './NoData.module.scss';

const NoData = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={c.noDataWrapper}>
        <div className={c.noData}>
          <h2 className='mb-4 mt-7'>No products found 📦</h2>
          <p>
            Sorry, we have not found any products on your request. But we will
            fix that soon 😉
          </p>
          <img
            src={noProductsImg}
            alt='Empty cart'
          />
          <Link
            to={Routes.Home}
            onClick={() => resetFilter(dispatch)}
            className='button button--black'>
            <span>Back</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoData;
