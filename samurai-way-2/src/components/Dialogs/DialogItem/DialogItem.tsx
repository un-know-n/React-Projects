import { NavLink } from 'react-router-dom';

import classes from '../Dialogs.module.css';

type TProps = {
  id: number;
  name: string;
};

const DialogItem = (props: TProps) => {
  return (
    <div className={classes.dialog_item}>
      <NavLink to={`${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
