import classNames from 'classnames';
import React, { useState } from 'react';

import { categories } from '../../../constants/filter';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { setCategory, setPage } from '../../../store/reducers/filter.slice';
import { takeCategory } from '../../../store/selectors/filter.selector';
import { TCategories } from '../../../types/common';

export const Categories = () => {
  const category = useTypedSelector(takeCategory);

  const dispatch = useAppDispatch();

  const handleClick = (category: TCategories) => {
    dispatch(setCategory(category));
    dispatch(setPage(1));
  };

  return (
    <>
      <div className='categories'>
        <ul className='m-auto'>
          {categories.map((c) => (
            <li
              key={c}
              className={classNames({
                active: category === c,
              })}
              onClick={() => handleClick(c)}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
