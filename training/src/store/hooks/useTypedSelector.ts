import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { TRootState } from '../reducers';

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
