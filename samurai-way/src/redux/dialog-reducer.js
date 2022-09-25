const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_FIELD = 'UPDATE-MESSAGE-FIELD';

let initialState = {
  dialogsData: [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
    { id: 4, name: 'Person 4' },
    { id: 5, name: 'Person 5' },
  ],
  messagesData: [
    { id: 1, message: 'Message 1' },
    { id: 2, message: 'Message 2' },
    { id: 3, message: 'Message 3' },
    { id: 4, message: 'Message 4' },
  ],
  textField: '',
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const currentID = state.messagesData.at(-1).id;
      let message = {
        id: currentID ? currentID + 1 : 1,
        message: state.textField,
      };
      state.messagesData.push(message);
      state.textField = '';
      break;

    case UPDATE_MESSAGE_FIELD:
      state.textField = action.updText;
      break;

    default:
      return state;
  }
  // return state;
  return { ...state };
};

export default dialogReducer;

export const addMessage_AC = () => ({ type: ADD_MESSAGE });
export const updateMessageField_AC = (updText) => ({
  type: UPDATE_MESSAGE_FIELD,
  updText: updText,
});
