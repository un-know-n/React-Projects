import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapRedirectToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  class RedirectContainer extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to='/login' />;
      return <Component {...this.props} />;
    }
  }
  let ConnectRedirectContainer = connect(
    mapRedirectToProps,
    {},
  )(RedirectContainer);
  return ConnectRedirectContainer;
};
