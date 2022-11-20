import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilter } from '../../types/IFilter';

const initialState: IFilter = {
  sort: '',
  category: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<IFilter>) {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
