import classes from './Users.module.css';
import Pagination from '../common/Pagination/Pagination';
import User from './User/User';

const Users = (props) => {
  return (
    <div className={classes.usersWrapper}>
      <Pagination {...props} />
      {props.users.map((user) => {
        return <User key={user.id} user={user} {...props} />;
      })}
    </div>
  );
};

export default Users;
