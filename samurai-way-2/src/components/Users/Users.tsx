import { FC } from 'react';

import { UsersDataType } from '../../shared/types/reducer-types';
import Pagination from '../common/Pagination/Pagination';
import User from './User/User';
import classes from './Users.module.css';

type PropsType = {
  totalItemsCount: number;
  usersAmount: number;
  currentPage: number;
  usersFromPage: (page: number) => void;
  users: Array<UsersDataType>;
  followInProgress: Array<number>;
  unfollowUserThunkCreator: (userId: number) => void;
  followUserThunkCreator: (userId: number) => void;
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
  ...props
}) => {
  return (
    <div className={classes.usersWrapper}>
      <Pagination
        totalItemsCount={totalItemsCount}
        usersAmount={usersAmount}
        currentPage={currentPage}
        usersFromPage={usersFromPage}
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
