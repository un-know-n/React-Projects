import classNames from 'classnames';
import React, { useState } from 'react';

import { categories } from '../../../constants/filter';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { setCategory } from '../../../store/reducers/filter.slice';
import { takeCategory } from '../../../store/selectors/filter.selector';

export const Categories = () => {
  const category = useTypedSelector(takeCategory);
  const dispatch = useAppDispatch();

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
              onClick={() => dispatch(setCategory(c))}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
