import React from 'react';
import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { NavigateFunction, useParams } from 'react-router-dom';
import { compose } from 'redux';

import { withRouter } from '../../hoc/withRouter';
import {
  getUserStatus_TC,
  savePhoto_TC,
  saveProfile_TC,
  takeUser_TC,
  updateUserStatus_TC,
} from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../shared/types/reducer-types';
import Preloader from '../common/Preloader/Preloader';
import Profile from './Profile';

type TProps = {
  param: Readonly<Partial<{ userId?: string | undefined }>>;
  userId: number;
  navigate: NavigateFunction;
  takeUserProfile: (userId: number) => void;
  getUserStatus_TC: (userId: number) => void;
  updateUserStatus_TC: (status: string) => void;
  profile: ProfileType;
};

class ProfileContainer extends React.Component<TProps> {
  renewProfile = () => {
    let userId = this.props.param.userId ? +this.props.param.userId : 0;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.navigate('/login');
      }
    }
    this.props.takeUserProfile(userId);
    this.props.getUserStatus_TC(userId);
  };

  componentDidMount() {
    this.renewProfile();
  }

  componentDidUpdate(prevProps: TProps) {
    if (prevProps.param.userId != this.props.param.userId) {
      this.renewProfile();
    }
  }

  render() {
    if (!this.props.profile) return <Preloader />;
    return (
      <Profile
        status={''}
        savePhoto={function (photo: File): void {
          throw new Error('Function not implemented.');
        }}
        saveProfile={function (profile: ProfileType): Promise<void> {
          throw new Error('Function not implemented.');
        }}
        {...this.props}
        param={this.props.param}
        isOwner={!this.props.param.userId}
        getUserStatus={this.props.getUserStatus_TC}
        updateUserStatus={this.props.updateUserStatus_TC}
      />
    );
  }
}

const TakeParams = (props: TProps) => {
  return (
    <ProfileContainer {...props} param={useParams<{ userId?: string }>()} />
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profile.profile,
    isAuth: state.auth.isAuth,
    status: state.profile.status,
    userId: state.auth.userId,
  };
};

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {
    takeUserProfile: takeUser_TC,
    getUserStatus_TC,
    updateUserStatus_TC,
    savePhoto: savePhoto_TC,
    saveProfile: saveProfile_TC,
  }),
)(TakeParams);
