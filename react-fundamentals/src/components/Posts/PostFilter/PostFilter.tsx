import React from 'react';

import { HTMLElementEvent } from '../../../shared/types/TEvent';
import { Filter } from '../../../shared/types/TFilter';
import { MyInput } from '../../UI/Input/MyInput';
import { MySelect } from '../../UI/Select/MySelect';

export const PostFilter = ({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) => {
  const filterOptions = [
    {
      name: 'By name',
      value: 'title',
    },
    {
      name: 'By description',
      value: 'body',
    },
  ];

  return (
    <>
      <MySelect
        defaultValue={'Sort by'}
        options={filterOptions}
        value={filter.sort}
        onChange={(sortType) => setFilter({ ...filter, sort: sortType })}
      />
      <MyInput
        value={filter.query}
        onChange={(e: HTMLElementEvent<HTMLInputElement>) =>
          setFilter({ ...filter, query: e.currentTarget.value })
        }
        placeholder={'Search for post you need...'}
      />
    </>
  );
};
