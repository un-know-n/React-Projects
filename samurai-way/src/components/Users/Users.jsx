import classes from './Users.module.css';
import userPhoto from '../../assets/images/user.webp';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  let currentPage = props.currentPage;
  for (
    let i = currentPage - 5 < 1 ? 1 : currentPage - 5;
    i <= pagesCount;
    i++
  ) {
    if (pages.length < 10) pages.push(i);
    else break;
  }

  return (
    <div className={classes.usersWrapper}>
      <div>
        {pages.map((page) => {
          return (
            <span
              className={page === props.currentPage ? classes.selectedPage : ''}
              onClick={() => props.usersFromPage(page)}>
              {page}
            </span>
          );
        })}
      </div>
      {props.users.map((user) => {
        return (
          <div key={user.id} className={classes.userContainer}>
            <span>
              <div>
                <NavLink to={`/profile/${user.id}`}>
                  <img
                    className={classes.userImage}
                    src={
                      user.photos.large != null ? user.photos.large : userPhoto
                    }
                    alt=''
                  />
                </NavLink>
              </div>
              <div>
                {user.followed ? (
                  <button onClick={() => props.unfollow(user.id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => props.follow(user.id)}>Follow</button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{'user.location.city'}</div>
                <div>{'user.location.country'}</div>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
