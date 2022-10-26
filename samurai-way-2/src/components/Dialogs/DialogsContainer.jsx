import { connect } from 'react-redux';
import { compose } from 'redux';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(actions.addMessage_AC(message)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(Dialogs);
