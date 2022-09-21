import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const activeLink = ({ isActive }) => (isActive ? classes.active : '');

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" className={activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" className={activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" className={activeLink}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" className={activeLink}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" className={activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
