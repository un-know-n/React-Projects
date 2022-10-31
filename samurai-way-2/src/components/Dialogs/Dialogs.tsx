import React, { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { InitialStateType } from '../../redux/dialog-reducer';
import { maxField, requiredField } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

const maxSymbols50 = maxField(50);

type TDialogFormValues = {
  dialogField: string;
};

type TDialogsFormValuesKeys = Extract<keyof TDialogFormValues, string>;

type TProps = {
  messages: InitialStateType;
  isAuth: boolean;
  addMessage: (message: string) => void;
};

const Dialogs = (props: TProps) => {
  //debugger;
  //if (props.isAuth === true) return <Navigate to='/login' />;

  const dialogs = props.messages.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));

  const messages = props.messages.messagesData.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  const onDialogSubmit = (formData: TDialogFormValues) => {
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

const DialogsForm: FC<InjectedFormProps<TDialogFormValues>> = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          {createField<TDialogsFormValuesKeys>(
            'Type anything you like...',
            'dialogField',
            [requiredField, maxSymbols50],
            Input,
            { type: 'text' },
          )}
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    </div>
  );
};

const DialogsReduxForm = reduxForm<TDialogFormValues>({
  form: 'dialogsForm',
})(DialogsForm);

export default Dialogs;
