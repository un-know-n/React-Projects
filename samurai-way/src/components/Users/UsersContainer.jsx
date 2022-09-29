import { connect } from 'react-redux';
import {
  follow,
  followUserThunkCreator,
  getUsersThunkCreator,
  setCurrentPage,
  setTotalCount,
  takeUsers,
  toggleFollowInProgress,
  toggleIsFetching,
  unfollow,
  unfollowUserThunkCreator,
} from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers(this.props.usersAmount, this.props.currentPage);
    // this.props.toggleIsFetching(true);
    // usersAPI.getUsers().then((data) => {
    //   this.props.takeUsers(data.items);
    //   this.props.setTotalCount(data.totalCount);
    //   this.props.toggleIsFetching(false);
    // });
    // this.props.toggleIsFetching(true);
  }

  usersFromPage = (page) => {
    this.props.setCurrentPage(page);
    this.props.getUsers(this.props.usersAmount, page);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          usersAmount={this.props.usersAmount}
          currentPage={this.props.currentPage}
          usersFromPage={this.usersFromPage}
          users={this.props.users}
          followInProgress={this.props.followInProgress}
          toggleFollowInProgress={this.props.toggleFollowInProgress}
          unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
          followUserThunkCreator={this.props.followUserThunkCreator}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.usersData,
    usersAmount: state.users.usersAmount,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    followInProgress: state.users.followInProgress,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => dispatch(follow_AC(userId)),
//     unfollow: (userId) => dispatch(unfollow_AC(userId)),
//     takeUsers: (users) => dispatch(takeUsers_AC(users)),
//     setCurrentPage: (page) => dispatch(setCurrentPage_AC(page)),
//     setTotalCount: (count) => dispatch(setTotalCount_AC(count)),
//     toggleIsFetching: (toggle) => dispatch(toggleIsFetching_AC(toggle)),
//   };
// };

//Creating a wrapper automatically over the Action Creators(using them with the dispatch() method)
export default connect(mapStateToProps, {
  takeUsers,
  setCurrentPage,
  setTotalCount,
  toggleIsFetching,
  toggleFollowInProgress,
  getUsers: getUsersThunkCreator,
  unfollowUserThunkCreator,
  followUserThunkCreator,
})(UsersContainer);
