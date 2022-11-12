import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { TRootState } from '../reducers';

export const useTypedDispatch = () =>
  useDispatch<ThunkDispatch<TRootState, any, Action>>();
