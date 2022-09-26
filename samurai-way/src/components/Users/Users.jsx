import classes from './Users.module.css';
import userPhoto from '../../assets/images/user.webp';
import * as axios from 'axios';
import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users?count=5')
      .then((response) => {
        this.props.takeUsers(response.data.items);
        this.props.setTotalCount(response.data.totalCount);
      });
  }

  usersFromPage(page) {
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=5&page=${page}`,
      )
      .then((response) => {
        this.props.takeUsers(response.data.items);
      });
  }

  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize,
    );
    let pages = [];
    let currentPage = this.props.currentPage;
    for (
      let i = currentPage - 5 < 0 ? 1 : currentPage - 5;
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
                className={
                  page === this.props.currentPage ? classes.selectedPage : ''
                }
                onClick={() => this.usersFromPage(page)}>
                {page}
              </span>
            );
          })}
        </div>
        {this.props.users.map((user) => {
          return (
            <div key={user.id} className={classes.userContainer}>
              <span>
                <div>
                  <img
                    className={classes.userImage}
                    src={
                      user.photos.large != null ? user.photos.large : userPhoto
                    }
                    alt=''
                  />
                </div>
                <div>
                  {user.followed ? (
                    <button onClick={() => this.props.unfollowUser(user.id)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => this.props.followUser(user.id)}>
                      Follow
                    </button>
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
  }
}

export default Users;
