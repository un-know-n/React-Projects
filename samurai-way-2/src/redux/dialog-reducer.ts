import { InferActionsTypes } from './redux-store';

type DialogsDataType = {
  id: number;
  name: string;
};

type MessagesDataType = {
  id: number;
  message: string;
};

let initialState = {
  dialogsData: [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
    { id: 4, name: 'Person 4' },
    { id: 5, name: 'Person 5' },
  ] as Array<DialogsDataType>,
  messagesData: [
    { id: 1, message: 'Message 1' },
    { id: 2, message: 'Message 2' },
    { id: 3, message: 'Message 3' },
    { id: 4, message: 'Message 4' },
  ] as Array<MessagesDataType>,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const dialogReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'dialog/ADD-MESSAGE':
      const currentID = state.messagesData[state.messagesData.length - 1].id;
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

export const actions = {
  addMessage_AC: (message: string) => ({
    type: 'dialog/ADD-MESSAGE',
    message,
  }),
};
