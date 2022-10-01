import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getUserStatus_TC,
  takeUser_TC,
  updateUserStatus_TC,
} from '../../redux/profile-reducer';
import Preloader from '../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = this.props.param.userId;
    //if (!userId) return;
    if (!userId) userId = '26088';
    this.props.takeUserProfile(userId);
    this.props.getUserStatus_TC(userId);
    //usersAPI.takeUser(userId).then((data) => this.props.setUserProfile(data));
  }

  render() {
    // console.log(this.props.param);
    //if (!this.props.isAuth) return <Navigate to='/login' />;
    if (!this.props.profile) return <Preloader />;
    return (
      <Profile
        {...this.props}
        getUserStatus={this.props.getUserStatus_TC}
        updateUserStatus={this.props.updateUserStatus_TC}
      />
    );
  }
}

// const RedirectProfileContainer = withAuthRedirect(<ProfileContainer {...props} param={useParams()} />);

const TakeParams = (props) => {
  return <ProfileContainer {...props} param={useParams()} />;
};

// const TakeParams = (props) => {
//   return withAuthRedirect(<ProfileContainer {...props} param={useParams()} />);
// };

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    isAuth: state.auth.isAuth,
    status: state.profile.status,
  };
};

export default compose(
  connect(mapStateToProps, {
    takeUserProfile: takeUser_TC,
    getUserStatus_TC,
    updateUserStatus_TC,
  }),
)(TakeParams);

// export default withAuthRedirect(
//   connect(mapStateToProps, { takeUser: takeUserThunkCreator })(TakeParams),
// );
