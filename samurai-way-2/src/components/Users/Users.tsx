import { FC, useEffect } from 'react';

import { TFilter } from '../../redux/users-reducer';
import { UsersDataType } from '../../shared/types/reducer-types';
import Pagination from '../common/Pagination/Pagination';
import User from './User/User';
import classes from './Users.module.css';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
  totalItemsCount: number;
  usersAmount: number;
  currentPage: number;
  usersFromPage: (page: number) => void;
  onFilterChanged: (filter: TFilter) => void;
  users: Array<UsersDataType>;
  followInProgress: Array<number>;
  unfollowUserThunkCreator: (userId: number) => void;
  followUserThunkCreator: (userId: number) => void;
  filter: TFilter;
};

const Users: FC<PropsType> = ({
  totalItemsCount,
  usersAmount,
  currentPage,
  usersFromPage,
  users,
  followInProgress,
  unfollowUserThunkCreator,
  followUserThunkCreator,
  filter,
  ...props
}) => {
  //useEffect(() => {}, []);

  return (
    <div className={classes.usersWrapper}>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
      <Pagination
        totalItemsCount={totalItemsCount}
        usersAmount={usersAmount}
        currentPage={currentPage}
        usersFromPage={usersFromPage}
        filter={filter}
        {...props}
      />
      {users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            followInProgress={followInProgress}
            unfollowUserThunkCreator={unfollowUserThunkCreator}
            followUserThunkCreator={followUserThunkCreator}
            {...props}
          />
        );
      })}
    </div>
  );
};

export default Users;
