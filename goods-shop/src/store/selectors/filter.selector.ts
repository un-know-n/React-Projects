import { TRootState } from '..';

export const takeCategory = (state: TRootState) => state.filter.category;

export const takeSort = (state: TRootState) => state.filter.sort;
