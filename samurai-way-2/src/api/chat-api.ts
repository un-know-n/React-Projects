import { TStatus } from '../redux/chat-reducer';

//let subscribers = [] as TSubscriber[];
let subscribers = {
  'messages-received': [] as TMessagesSubscriber[],
  'status-changed': [] as TStatusSubscriber[],
};

let wsChannel: WebSocket | null = null;

type TEvent = 'messages-received' | 'status-changed';

const messageHandler = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data);
  subscribers['messages-received'].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
};

const cleanUp = () => {
  wsChannel?.removeEventListener('close', closeHandler);
  wsChannel?.removeEventListener('message', messageHandler);
  wsChannel?.removeEventListener('open', openHandler);
  wsChannel?.removeEventListener('error', errorHandler);
};

const closeHandler = () => {
  console.log('Closed');
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const notifySubscribersAboutStatus = (status: TStatus) => {
  subscribers['status-changed'].forEach((s) => s(status));
};

const createChannel = () => {
  if (wsChannel != null) {
    cleanUp();
    wsChannel.close();
  }
  wsChannel = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  notifySubscribersAboutStatus('pending');
  wsChannel.addEventListener('close', closeHandler);
  wsChannel.addEventListener('message', messageHandler);
  wsChannel.addEventListener('open', openHandler);
  wsChannel.addEventListener('error', errorHandler);
};

export const chatAPI = {
  start: () => {
    createChannel();
  },
  stop: () => {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    wsChannel?.close();
  },
  subscribe: (
    event: TEvent,
    callback: TMessagesSubscriber | TStatusSubscriber,
  ) => {
    //@ts-ignore
    subscribers[event].push(callback);

    //Create the ability to unsubscribe by calling the returning function, like in Redux(read about cleanup...)
    return () => {
      //@ts-ignore
      subscribers[event] = subscribers[event].filter((s) => s !== callback);
    };
  },
  //Default realization of the unsubscribe method
  unsubscribe: (
    event: TEvent,
    callback: TMessagesSubscriber | TStatusSubscriber,
  ) => {
    //@ts-ignore
    subscribers[event] = subscribers[event].filter((s) => s !== callback);
  },
  //Send message
  sendMessage: (message: string) => {
    wsChannel?.send(message);
  },
};

type TMessagesSubscriber = (messages: TMessage[]) => void;
type TStatusSubscriber = (status: TStatus) => void;

export type TMessage = {
  userId: number;
  userName: string;
  message: string;
  photo: string;
};
