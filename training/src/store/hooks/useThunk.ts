import { bindActionCreators } from 'redux';

import * as userThunk from './../thunk/userThunk';
import { useTypedDispatch } from './useTypedDispatch';

export const useThunk = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(userThunk, dispatch);
};
