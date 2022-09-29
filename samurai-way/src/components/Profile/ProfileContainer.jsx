import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  setUserProfile,
  takeUserThunkCreator,
} from '../../redux/profile-reducer';
import Preloader from '../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = this.props.param.userId;
    // if (!userId) userId = '2';
    this.props.takeUser(userId);
    //usersAPI.takeUser(userId).then((data) => this.props.setUserProfile(data));
  }

  render() {
    // console.log(this.props.param);
    if (!this.props.profile) return <Preloader />;
    return <Profile {...this.props} />;
  }
}

const TakeParams = (props) => {
  return <ProfileContainer {...props} param={useParams()} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { takeUser: takeUserThunkCreator })(
  TakeParams,
);
