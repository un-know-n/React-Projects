import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { TRootState } from '..';

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
