let subscribers = [] as TSubscriber[];

let wsChannel: WebSocket | null = null;

const messageHandler = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data);
  subscribers.forEach((s) => s(newMessages));
};

const closeHandler = () => {
  console.log('Closed');
  setTimeout(createChannel, 3000);
};

const createChannel = () => {
  if (wsChannel != null) {
    wsChannel.removeEventListener('close', closeHandler);
    wsChannel.close();
  }
  wsChannel = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  wsChannel.addEventListener('close', closeHandler);
  wsChannel.addEventListener('message', messageHandler);
};

export const chatAPI = {
  start: () => {
    createChannel();
  },
  stop: () => {
    subscribers = [];
    wsChannel?.removeEventListener('close', closeHandler);
    wsChannel?.removeEventListener('message', messageHandler);
    wsChannel?.close();
  },
  subscribe: (callback: TSubscriber) => {
    subscribers.push(callback);

    //Create the ability to unsubscribe by calling the returning function, like in Redux(read about cleanup...)
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  //Default realization of the unsubscribe method
  unsubscribe: (callback: TSubscriber) => {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  //Send message
  sendMessage: (message: string) => {
    wsChannel?.send(message);
  },
};

type TSubscriber = (messages: TMessage[]) => void;

export type TMessage = {
  userId: number;
  userName: string;
  message: string;
  photo: string;
};
