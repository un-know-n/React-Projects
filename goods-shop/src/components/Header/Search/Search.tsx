import React, { FC, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDebounce } from '../../../hooks/useDebounce';
import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { setQuery } from '../../../store/reducers/filter.slice';
import c from './Search.module.scss';

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  //Local state to save the temp search string
  const [searchValue, setSearchValue] = useState('');

  //Reference for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  //Using debounce to change state after some time
  const debouncedSearch = useDebounce(
    (value: string) => dispatch(setQuery(value)),
    500,
  );

  //Push the string to the local state, if time passed, dispatch it to the real state(using debounce)
  const searchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    debouncedSearch(event.currentTarget.value);
  };

  //When the user clicked on x-sign to clear the search field
  const cleanHandler = () => {
    dispatch(setQuery(''));
    setSearchValue('');
    searchInputRef.current?.focus();
  };

  return (
    <>
      {' '}
      {location.pathname !== '/cart' && (
        <div className={c.header__search}>
          <svg
            className={c.search__svg}
            id='Layer_1'
            version='1.1'
            viewBox='0 0 512 512'>
            <path d='M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z' />
          </svg>
          <input
            ref={searchInputRef}
            value={searchValue}
            type='text'
            onChange={(event) => searchHandler(event)}
            className={c.input__search}
            placeholder='Find item...'
          />
          {searchValue && (
            <svg
              className={c.close__svg}
              version='1.1'
              viewBox='0 0 24 24'
              onClick={cleanHandler}>
              <path d='M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z' />
            </svg>
          )}
        </div>
      )}
    </>
  );
};
