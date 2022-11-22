import { TRootState } from '..';

export const takeCategory = (state: TRootState) => state.filter.category;

export const takeSort = (state: TRootState) => state.filter.sort;

export const takeLimit = (state: TRootState) => state.filter.limit;

export const takeQuery = (state: TRootState) => state.filter.query;

export const takePage = (state: TRootState) => state.filter.page;
