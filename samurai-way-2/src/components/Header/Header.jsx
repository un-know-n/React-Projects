import classes from './Header.module.css';
import headerLogo from '../../assets/images/header-logo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const logOutBtn = () => {
    props.logOutUser_TC();
  };

  return (
    <header className={classes.header}>
      <img src={headerLogo} alt='header-logo' />
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={logOutBtn}>Log Out</button>
          </div>
        ) : (
          <NavLink className={classes.loginLink} to='/login'>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
