import { useDispatch } from 'react-redux';

import { TAppDispatch } from '..';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
