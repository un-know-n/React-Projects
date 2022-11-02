import { Dispatch } from 'react';
import { v1 } from 'uuid';

import { chatAPI, TMessage } from '../api/chat-api';
import { GeneralThunkType, InferActionsTypes } from './redux-store';

type TChatMessage = TMessage & { id: string };

let initialState = {
  messages: [] as TChatMessage[],
  status: 'pending' as TStatus,
};

type TActions = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
export type TStatus = 'pending' | 'ready' | 'error';

const chatReducer = (
  state = initialState,
  action: TActions,
): InitialStateType => {
  switch (action.type) {
    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    case 'SN/chat/STATUS_CHANGED':
      return { ...state, status: action.payload.status };
    case 'SN/chat/CLEAR_MESSAGES':
      return { ...state, messages: action.payload.clear };
    default:
      return state;
  }
};

let _newMessageHandler: ((messages: TMessage[]) => void) | null = null;

let _statusChangedHandler: ((status: TStatus) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: TMessage[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

const newStatusHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: TStatus) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening =
  (): GeneralThunkType => async (dispatch) => {
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch));
    chatAPI.start();
  };

export const stopMessagesListening =
  (): GeneralThunkType => async (dispatch) => {
    chatAPI.unsubscribe(
      'messages-received',
      newMessagesHandlerCreator(dispatch),
    );
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch));
    chatAPI.stop();
    dispatch(actions.clearMessages());
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
  statusChanged: (status: TStatus) =>
    ({
      type: 'SN/chat/STATUS_CHANGED',
      payload: { status },
    } as const),
  clearMessages: (clear: TChatMessage[] = []) =>
    ({
      type: 'SN/chat/CLEAR_MESSAGES',
      payload: { clear },
    } as const),
};

export default chatReducer;
