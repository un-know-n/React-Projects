import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import { TFilter } from '../../../redux/users-reducer';
import classes from './Pagination.module.css';

type PropsType = {
  totalItemsCount: number;
  itemsAmount: number;
  currentPage: number;
  itemsFromPage: (page: number) => void;
  portionSize?: number;
  filter: TFilter;
};

const Pagination: FC<PropsType> = ({
  totalItemsCount,
  itemsAmount,
  currentPage,
  itemsFromPage,
  portionSize = 5,
}) => {
  useEffect(() => {}, [currentPage]);

  let pagesCount = Math.ceil(totalItemsCount / itemsAmount);
  let pages = [];
  // let currentPage = props.currentPage;

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(
    Math.floor(currentPage / 5) + 1,
  );
  let leftBorder = (portionNumber - 1) * portionSize + 1;
  let rightBorder = portionNumber * portionSize;

  for (let i = leftBorder; i <= rightBorder; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.pagination}>
      {portionNumber > 1 ? (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          PREV
        </button>
      ) : (
        ''
      )}
      {pages
        .filter((page) => page >= leftBorder && page <= rightBorder)
        .map((page) => {
          return (
            <span
              key={page}
              className={classNames(
                {
                  [classes.selectedPage]: page === currentPage,
                },
                classes.pageNumber,
              )}
              onClick={() => itemsFromPage(page)}>
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber ? (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          NEXT
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
