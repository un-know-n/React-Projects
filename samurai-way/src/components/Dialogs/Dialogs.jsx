import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';

const Dialogs = (props) => {
  // console.log(props);
  // debugger;

  if (props.isAuth === false) return <Navigate to='/login' />;

  const dialogs = props.messages.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  const messages = props.messages.messagesData.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  let textareaRef = React.createRef();

  let addMessageOnChange = () => {
    props.addMessage();
  };

  let updateFieldOnChange = () => {
    props.updateField(textareaRef.current.value);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>{dialogs}</div>
      <div>
        <div className={classes.messages}>{messages}</div>
        <div>
          <div>
            <textarea
              ref={textareaRef}
              placeholder='Enter new post'
              value={props.messages.textField}
              onChange={updateFieldOnChange}></textarea>
          </div>
          <div>
            <button onClick={addMessageOnChange}>Add post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
