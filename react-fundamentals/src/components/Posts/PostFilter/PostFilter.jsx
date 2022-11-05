import React from 'react';

import { MyInput } from './../../UI/Input/MyInput';
import { MySelect } from './../../UI/Select/MySelect';

export const PostFilter = ({ filter, setFilter }) => {
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
        defaulValue={'Sort by'}
        options={filterOptions}
        value={filter.sort}
        onChange={(sortType) => setFilter({ ...filter, sort: sortType })} //sortPosts
      />
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.currentTarget.value })} //searchQuery
        placeholder={'Search for post you need...'}
      />
    </>
  );
};
