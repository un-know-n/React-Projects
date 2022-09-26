import { connect } from 'react-redux';
import Users from './Users';
import {
  follow_AC,
  setCurrentPageAC,
  setTotalCountAC,
  takeUsers_AC,
  unfollow_AC,
} from '../../redux/users-reducer';

const mapStateToProps = (state) => {
  return {
    users: state.users.usersData,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    followUser: (userId) => dispatch(follow_AC(userId)),
    unfollowUser: (userId) => dispatch(unfollow_AC(userId)),
    takeUsers: (users) => dispatch(takeUsers_AC(users)),
    setCurrentPage: (page) => dispatch(setCurrentPageAC(page)),
    setTotalCount: (count) => dispatch(setTotalCountAC(count)),
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
