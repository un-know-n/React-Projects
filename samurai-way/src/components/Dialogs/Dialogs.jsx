import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogItem = (props) => {
  return (
    <div className={classes.dialog_item}>
      <NavLink to={props.id}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={classes.message}>{props.message}</div>;
};

const Dialogs = (props) => {
  let dialogsData = [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
    { id: 4, name: 'Person 4' },
    { id: 5, name: 'Person 5' },
  ];

  let messagesData = [
    { id: 1, message: 'Message 1' },
    { id: 2, message: 'Message 2' },
    { id: 3, message: 'Message 3' },
    { id: 4, message: 'Message 4' },
  ];

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>
        <DialogItem name="Person 1" id="1" />
        <DialogItem name="Person 2" id="2" />
        <DialogItem name="Person 3" id="3" />
      </div>
      <div className={classes.messages}>
        <Message message="lorem" />
        <Message message="lorem" />
        <Message message="lorem" />
        <Message message="lorem" />
        <Message message="lorem" />
      </div>
    </div>
  );
};

export default Dialogs;
