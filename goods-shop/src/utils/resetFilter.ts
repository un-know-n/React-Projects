import { defaultFilter } from '../constants/filter';
import { TAppDispatch } from '../store';
import { setFilter } from '../store/reducers/filter.slice';

export const resetFilter = (dispatch: TAppDispatch) =>
  dispatch(setFilter(defaultFilter));
