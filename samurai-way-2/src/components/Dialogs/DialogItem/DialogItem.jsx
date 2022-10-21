import { NavLink } from 'react-router-dom';
import classes from '../Dialogs.module.css';

const DialogItem = (props) => {
  return (
    <div className={classes.dialog_item}>
      <NavLink to={`${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
