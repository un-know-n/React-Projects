import { defaultFilter } from '../../../constants/filter';
import { TAppDispatch } from '../../../store';
import { setFilter } from '../../../store/reducers/filter.slice';

//Set default filter for user
export const resetFilter = (dispatch: TAppDispatch) =>
  dispatch(setFilter(defaultFilter));
