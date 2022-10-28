import { NavLink } from 'react-router-dom';

import { FriendsDataType } from '../../redux/sidebar-reducer';
import classes from './Navbar.module.css';

const activeLink: TActiveLink = ({ isActive }) =>
  isActive ? classes.active : '';

type TActiveLink = (isActive: any) => any;
type PropsType = {
  friends: Array<FriendsDataType>;
};

const Navbar = (props: PropsType) => {
  const friends = props.friends.map((friend) => {
    return (
      <div className={classes.friendsItem} key={friend.id}>
        <div className={classes.friendsIcon}>
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            alt=''
          />
        </div>
        <div className={classes.friendsName}>{friend.name}</div>
      </div>
    );
  });

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' className={activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' className={activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' className={activeLink}>
          Users
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/news' className={activeLink}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/music' className={activeLink}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/settings' className={activeLink}>
          Settings
        </NavLink>
      </div>

      <div className={classes.friendsWrapper}>
        <h2 className={classes.friendsTitle}>Friends</h2>
        {friends}
      </div>
    </nav>
  );
};

export default Navbar;
