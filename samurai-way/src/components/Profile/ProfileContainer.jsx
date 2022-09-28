import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import * as axios from 'axios';
import Preloader from '../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = this.props.param.userId;
    // if (!userId) userId = '2';
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    console.log(this.props.param);
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

export default connect(mapStateToProps, { setUserProfile })(TakeParams);
