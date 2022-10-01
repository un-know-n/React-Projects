const ADD_MESSAGE = 'ADD-MESSAGE';

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
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const currentID = state.messagesData.at(-1).id;
      let message = {
        id: currentID ? currentID + 1 : 1,
        message: action.message,
      };
      return {
        ...state,
        messagesData: [...state.messagesData, message],
      };

    default:
      return state;
  }
};

export default dialogReducer;

export const addMessage_AC = (message) => ({ type: ADD_MESSAGE, message });
