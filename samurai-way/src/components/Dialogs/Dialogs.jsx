import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {
  if (props.isAuth === false) return <Navigate to='/login' />;

  const dialogs = props.messages.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  const messages = props.messages.messagesData.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  const onDialogSubmit = (formData) => {
    props.addMessage(formData.dialogField);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>{dialogs}</div>
      <div>
        <div className={classes.messages}>{messages}</div>
        <DialogsReduxForm onSubmit={onDialogSubmit} />
      </div>
    </div>
  );
};

const DialogsForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            name='dialogField'
            component='textarea'
            placeholder='Enter new post'
          />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    </div>
  );
};

const DialogsReduxForm = reduxForm({
  form: 'dialogsForm',
})(DialogsForm);

export default Dialogs;
