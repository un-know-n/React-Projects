import React, { FC, memo } from 'react';
import ReactPaginate from 'react-paginate';

import { useAppDispatch } from '../../../store/hooks/useTypedDispatch';
import { setPage } from '../../../store/reducers/filter.slice';
import c from './Pagination.module.scss';

type TProps = {
  pageCount: number;
  forcePage: number;
  className?: string;
};

export const Pagination: FC<TProps> = memo(
  ({ pageCount, className, forcePage }) => {
    const dispatch = useAppDispatch();

    // Set current page
    const handlePageClick = (event: any) => {
      dispatch(setPage(event?.selected + 1));
    };

    return (
      <>
        <div className={className ? className : ''}>
          <ReactPaginate
            className={c.pagination}
            breakLabel='...'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='<'
            nextLabel='>'
            forcePage={forcePage - 1}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  },
);
Pagination.displayName = 'Pagination';
