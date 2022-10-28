import React, { FC } from 'react';
import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppStateType } from '../redux/redux-store';

const mapRedirectToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapRedirectPropsType = ReturnType<typeof mapRedirectToProps>;

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
  Component: ComponentType<WCP>,
) {
  let RedirectContainer: FC<MapRedirectPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to='/login' />;
    return <Component {...(restProps as WCP)} />;
  };
  let ConnectRedirectContainer = connect<
    MapRedirectPropsType,
    {},
    WCP,
    AppStateType
  >(
    mapRedirectToProps,
    {},
  )(RedirectContainer);
  return ConnectRedirectContainer;
}
