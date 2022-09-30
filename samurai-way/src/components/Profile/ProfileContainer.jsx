import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  setUserProfile,
  takeUserThunkCreator,
} from '../../redux/profile-reducer';
import Preloader from '../common/Preloader/Preloader';
import { Navigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = this.props.param.userId;
    //if (!userId) userId = '2';
    if (!userId) return;
    this.props.takeUser(userId);
    //usersAPI.takeUser(userId).then((data) => this.props.setUserProfile(data));
  }

  render() {
    // console.log(this.props.param);
    if (!this.props.isAuth) return <Navigate to='/login' />;
    if (!this.props.profile) return <Preloader />;
    return <Profile {...this.props} />;
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
  };
};

export default compose(
  connect(mapStateToProps, { takeUser: takeUserThunkCreator }),
  withAuthRedirect,
)(TakeParams);

// export default withAuthRedirect(
//   connect(mapStateToProps, { takeUser: takeUserThunkCreator })(TakeParams),
// );
