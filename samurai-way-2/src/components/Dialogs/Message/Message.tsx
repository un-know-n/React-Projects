import classes from '../Dialogs.module.css';

type TProps = {
  message: string;
};

const Message = (props: TProps) => {
  return <div className={classes.message}>{props.message}</div>;
};

export default Message;
