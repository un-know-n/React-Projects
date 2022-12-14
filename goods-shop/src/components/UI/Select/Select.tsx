import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { sorts } from '../../../constants/filter';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { setSort } from '../../../store/reducers/filter.slice';
import { takeSort } from '../../../store/selectors/filter.selector';

export const SortSelect: FC = () => {
  const [isOpen, toggleIsOpen] = useState(false);
  const sort = useTypedSelector(takeSort);
  const sortRef = useRef(null);
  const dispatch = useAppDispatch();

  //Close select when clicked outside it's area
  const onOutside = useCallback((event: MouseEvent) => {
    if (
      !event.composedPath().includes(sortRef.current as unknown as EventTarget)
    )
      toggleIsOpen(false);
  }, []);

  //Set event listeners
  useEffect(() => {
    document.body.addEventListener('click', onOutside);
    return () => {
      document.body.removeEventListener('click', onOutside);
    };
  }, []);

  return (
    <>
      <div
        className='sort'
        ref={sortRef}>
        {sort && (
          <>
            <div className='sort__label'>
              <svg
                className={isOpen ? 'active' : ''}
                width='10'
                height='6'
                viewBox='0 0 10 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                  fill='#2C2C2C'
                />
              </svg>
              <b>Sort by:</b>
              <span onClick={() => toggleIsOpen(!isOpen)}>
                {sorts.map((s) => (sort.name === s.name ? s.name : ''))}
              </span>
            </div>
            {isOpen && (
              <div className='sort__popup'>
                <ul>
                  {sorts.map((s, i) => (
                    <li
                      key={i}
                      className={classNames({ active: sort.name === s.name })}
                      onClick={() => {
                        dispatch(setSort(s));
                        toggleIsOpen(!isOpen);
                      }}>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
