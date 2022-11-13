import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { TRootState } from '..';
import { TAppDispatch } from '..';

export const useTypedDispatch = () =>
  useDispatch<ThunkDispatch<TRootState, any, Action>>();

export const useAppDispatch = () => useDispatch<TAppDispatch>();
