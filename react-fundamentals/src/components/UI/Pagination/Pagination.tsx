import React, { FC } from 'react';

import { usePagination } from '../../../hooks/usePagination';
import cl from './Pagination.module.css';

type Props = {
  totalCount: number;
  currentPage: number;
  limit: number;
  setPage: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  totalCount,
  limit,
  currentPage,
  setPage,
}) => {
  const pagesArray = usePagination(totalCount, limit);

  return (
    <div className={cl.page__wrapper}>
      {pagesArray.map((p) => (
        <div
          key={p}
          className={
            p === currentPage ? `${cl.page} ${cl.page__current}` : cl.page
          }
          onClick={() => setPage(p)}
        >
          {p}
        </div>
      ))}
    </div>
  );
};
