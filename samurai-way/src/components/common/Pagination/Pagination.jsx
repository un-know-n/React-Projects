import classes from '../../Users/Users.module.css';

const Pagination = ({
  totalUsersCount: totalItemsCount,
  usersAmount,
  currentPage,
  usersFromPage,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / usersAmount);
  let pages = [];
  // let currentPage = props.currentPage;
  for (
    let i = currentPage - 5 < 1 ? 1 : currentPage - 5;
    i <= pagesCount;
    i++
  ) {
    if (pages.length < 10) pages.push(i);
    else break;
  }

  return (
    <div>
      {pages.map((page) => {
        return (
          <span
            key={page}
            className={page === currentPage ? classes.selectedPage : ''}
            onClick={() => usersFromPage(page)}>
            {page}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
