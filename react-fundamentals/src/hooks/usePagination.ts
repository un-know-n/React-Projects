import { useMemo } from 'react';

import { getPagesArray, getTotalCount } from '../utils/pages';

export const usePagination = (totalCount: number, limit = 10) => {
  const pagesArray = useMemo(
    () => getPagesArray(getTotalCount(totalCount, limit)),
    [totalCount, limit]
  );

  return pagesArray;
};
