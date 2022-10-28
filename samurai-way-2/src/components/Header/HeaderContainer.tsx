import React from 'react';
import { connect } from 'react-redux';

import { logOutUser_TC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header, { PropsType } from './Header';

class HeaderContainer extends React.Component {
  render() {
    return <Header {...(this.props as PropsType)} />;
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { logOutUser_TC })(HeaderContainer);
