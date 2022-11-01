import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { TMessage } from '../../api/chat-api';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

type TOwnDispatch = ThunkDispatch<AppStateType, any, Action>;

export const ChatPage: FC = () => {
  return (
    <>
      <Chat />
    </>
  );
};

export const Chat: FC = () => {
  const dispatch = useDispatch<TOwnDispatch>();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};

export const Messages: FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  return (
    <>
      <div style={{ height: '350px', width: '100%', overflowY: 'scroll' }}>
        {messages.map((message: TMessage, index) => {
          return <Message key={index} {...message} />;
        })}
      </div>
    </>
  );
};

const Message: FC<TMessage> = (props) => {
  const { photo, userName, message } = props;
  return (
    <>
      <div className='messageWrapper'>
        <img src={photo} alt='' />
        <b>{userName}</b>
        <p>{message}</p>
      </div>
    </>
  );
};

export const AddMessageForm: FC = () => {
  let [message, setMessage] = useState('');
  let [readyStatus, setStatus] = useState<'pending' | 'ready'>('pending');

  const dispatch = useDispatch<TOwnDispatch>();

  const sendMessageHandler = () => {
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <>
      <div className='addMessageWrapper' style={{ display: 'flex' }}>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}></TextArea>
        <Button type='dashed' disabled={false} onClick={sendMessageHandler}>
          Send
        </Button>
      </div>
    </>
  );
};
