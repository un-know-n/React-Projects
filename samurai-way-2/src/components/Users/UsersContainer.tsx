import React from 'react';
import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { AppStateType } from '../../redux/redux-store';
import {
  getCurrentPage,
  getFollowInProgress,
  getIsFetching,
  getTotalUsersCount,
  getUsers,
  getUsersAmount,
} from '../../redux/selectors/users-selectors';
import { actions, followUserThunkCreator, getUsersThunkCreator, unfollowUserThunkCreator } from '../../redux/users-reducer';
import { UsersDataType } from '../../shared/types/reducer-types';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

type MapStatePropsType = {
  users: Array<UsersDataType>;
  usersAmount: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followInProgress: Array<number>;
};

type MapDispatchPropsType = {
  setCurrentPage: (page: number) => void;
  getUsersThunkCreator: (usersAmount: number, page: number) => void;
  unfollowUserThunkCreator: (userId: number) => void;
  followUserThunkCreator: (userId: number) => void;
};

type OwnPropsType = {
  outerTitle?: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.usersAmount,
      this.props.currentPage,
    );
  }

  usersFromPage = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.getUsersThunkCreator(this.props.usersAmount, page);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <h2>{this.props.outerTitle}</h2>
        <Users
          totalItemsCount={this.props.totalUsersCount}
          usersAmount={this.props.usersAmount}
          currentPage={this.props.currentPage}
          usersFromPage={this.usersFromPage}
          users={this.props.users}
          followInProgress={this.props.followInProgress}
          unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
          followUserThunkCreator={this.props.followUserThunkCreator}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    usersAmount: getUsersAmount(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followInProgress: getFollowInProgress(state),
  };
};

export default compose<ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      setCurrentPage: actions.setCurrentPage,
      getUsersThunkCreator,
      unfollowUserThunkCreator,
      followUserThunkCreator,
    },
  ),
)(UsersContainer);
