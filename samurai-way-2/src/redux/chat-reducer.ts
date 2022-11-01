import { Dispatch } from 'react';

import { chatAPI, TMessage } from '../api/chat-api';
import { GeneralThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  messages: [] as TMessage[],
};

type TActions = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: TActions,
): InitialStateType => {
  switch (action.type) {
    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
};

let _newMessageHandler: ((messages: TMessage[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: TMessage[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening =
  (): GeneralThunkType => async (dispatch) => {
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch));
    chatAPI.start();
  };

export const stopMessagesListening =
  (): GeneralThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch));
    chatAPI.stop();
  };

export const sendMessage =
  (message: string): GeneralThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export const actions = {
  messagesReceived: (messages: TMessage[]) =>
    ({
      type: 'SN/chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
};

export default chatReducer;
