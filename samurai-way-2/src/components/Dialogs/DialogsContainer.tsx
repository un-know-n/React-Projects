import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialog-reducer';
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

const mapStateToProps = (state: AppStateType) => {
  return {
    messages: state.messages,
    isAuth: state.auth.isAuth,
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { addMessage: actions.addMessage_AC }),
  withAuthRedirect,
)(Dialogs);
