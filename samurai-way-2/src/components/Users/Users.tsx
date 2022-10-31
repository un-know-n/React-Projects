import * as qs from 'qs';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppStateType } from '../../redux/redux-store';
import {
  getCurrentPage,
  getFilter,
  getFollowInProgress,
  getTotalUsersCount,
  getUsers,
  getUsersAmount,
} from '../../redux/selectors/users-selectors';
import {
  actions,
  followUserThunkCreator,
  getUsersThunkCreator,
  TFilter,
  unfollowUserThunkCreator,
} from '../../redux/users-reducer';
import { UsersDataType } from '../../shared/types/reducer-types';
import Pagination from '../common/Pagination/Pagination';
import User from './User/User';
import classes from './Users.module.css';
import { UsersSearchForm } from './UsersSearchForm';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export type TypedDispatch = ThunkDispatch<AppStateType, any, Action>;

const Users: FC = () => {
  const filter = useSelector(getFilter);
  const followInProgress = useSelector(getFollowInProgress);
  let currentPage = useSelector(getCurrentPage);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const usersAmount = useSelector(getUsersAmount);
  const users = useSelector(getUsers);

  const dispatch = useTypedDispatch();
  //const dispatch = useDispatch();

  const navigate = useNavigate();

  const takeParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let term = urlParams.get('term') as string;
    let friend = urlParams.get('friend') as boolean | null | string;
    friend = friend === 'null' ? null : friend === 'true' ? true : false;
    const page = Number(urlParams.get('page')) || 1;
    actions.setCurrentPage(page);
    const currentFilter = {
      term,
      friend,
    };
    return { currentFilter, page };
  };

  useEffect(() => {
    const { currentFilter, page } = takeParams();
    dispatch(getUsersThunkCreator(usersAmount, page, currentFilter));
  }, [dispatch, usersAmount]);

  useEffect(() => {
    const query: any = {};
    if (!!filter.term && filter.term !== 'null') query.term = filter.term;
    else query.term = '';
    if (filter.friend != null) query.friend = filter.friend;
    if (currentPage !== 1) query.page = String(currentPage);
    navigate(`/users?${qs.stringify(query)}`);
  }, [filter, currentPage, navigate]);

  const usersFromPage = (page: number) => {
    dispatch(actions.setCurrentPage(page));
    dispatch(getUsersThunkCreator(usersAmount, page, filter));
  };

  const onFilterChanged = (filter: TFilter) => {
    dispatch(getUsersThunkCreator(usersAmount, 1, filter));
  };

  const unfollow = (userId: number) => {
    dispatch(unfollowUserThunkCreator(userId));
  };

  const follow = (userId: number) => {
    dispatch(followUserThunkCreator(userId));
  };

  return (
    <div className={classes.usersWrapper}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Pagination
        totalItemsCount={totalItemsCount}
        itemsAmount={usersAmount}
        currentPage={currentPage}
        itemsFromPage={usersFromPage}
        filter={filter}
      />
      {users.map((user: UsersDataType) => {
        return (
          <User
            key={user.id}
            user={user}
            followInProgress={followInProgress}
            unfollowUserThunkCreator={unfollow}
            followUserThunkCreator={follow}
          />
        );
      })}
    </div>
  );
};

export default Users;
