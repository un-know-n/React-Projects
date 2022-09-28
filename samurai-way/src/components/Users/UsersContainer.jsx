import { connect } from 'react-redux';
import {
  follow,
  setCurrentPage,
  setTotalCount,
  takeUsers,
  toggleIsFetching,
  unfollow,
} from '../../redux/users-reducer';
import React from 'react';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users?count=5')
      .then((response) => {
        this.props.takeUsers(response.data.items);
        this.props.setTotalCount(response.data.totalCount);
        this.props.toggleIsFetching(false);
      });
  }

  usersFromPage = (page) => {
    this.props.setCurrentPage(page);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=5&page=${page}`,
      )
      .then((response) => {
        this.props.takeUsers(response.data.items);
        this.props.toggleIsFetching(false);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          usersFromPage={this.usersFromPage}
          unfollowUser={this.props.unfollowUser}
          followUser={this.props.followUser}
          users={this.props.users}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.usersData,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
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
  follow,
  unfollow,
  takeUsers,
  setCurrentPage,
  setTotalCount,
  toggleIsFetching,
})(UsersContainer);
