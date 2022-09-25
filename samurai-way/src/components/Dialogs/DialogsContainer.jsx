import {
  addMessage_AC,
  updateMessageField_AC,
} from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateField: (value) => dispatch(updateMessageField_AC(value)),
    addMessage: () => dispatch(addMessage_AC()),
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
