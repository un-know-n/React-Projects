import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { categories, limit, sorts } from '../../constants/filter';
import { TCategories, TSorts } from '../../types/common';
import { IFilter } from '../../types/IFilter';

const initialState: IFilter = {
  sort: sorts[0],
  category: categories[0],
  query: '',
  limit: limit,
  page: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<IFilter>) {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.query = action.payload.query;
      state.limit = action.payload.limit;
      state.page = action.payload.page;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSort(state, action: PayloadAction<TSorts>) {
      state.sort = action.payload;
    },
    setCategory(state, action: PayloadAction<TCategories>) {
      state.category = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilter, setCategory, setQuery, setSort, setPage } =
  filterSlice.actions;

export default filterSlice.reducer;
