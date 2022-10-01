import { addMessage_AC } from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// const DialogsContainer = () => {
//   return (
//     <StoreContext>
//       {(store) => {
//         let addMessage = () => {
//           store.dispatch(addMessage_AC());
//         };
//
//         let updateField = (value) => {
//           store.dispatch(updateMessageField_AC(value));
//         };
//         return (
//           <Dialogs
//             updateField={updateField}
//             addMessage={addMessage}
//             messages={store.getState().messages}
//           />
//         );
//       }}
//     </StoreContext>
//   );
// };

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(addMessage_AC(message)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(Dialogs);

// const DialogsContainer = withAuthRedirect(
//   connect(mapStateToProps, mapDispatchToProps)(Dialogs),
// );
//
// export default DialogsContainer;
