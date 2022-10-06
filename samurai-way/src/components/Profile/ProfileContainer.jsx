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
import { withRouter } from '../../hoc/withRouter';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = this.props.param.userId;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.navigate('/login');
      }
    }
    this.props.takeUserProfile(userId);
    this.props.getUserStatus_TC(userId);
  }

  render() {
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

const TakeParams = (props) => {
  return <ProfileContainer {...props} param={useParams()} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    isAuth: state.auth.isAuth,
    status: state.profile.status,
    userId: state.auth.userId,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    takeUserProfile: takeUser_TC,
    getUserStatus_TC,
    updateUserStatus_TC,
  }),
)(TakeParams);

// export default withAuthRedirect(
//   connect(mapStateToProps, { takeUser: takeUserThunkCreator })(TakeParams),
// );
