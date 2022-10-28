import { NavLink } from 'react-router-dom';

import headerLogo from '../../assets/images/header-logo.png';
import classes from './Header.module.css';

export type PropsType = {
  isAuth: boolean;
  login: string;
  logOutUser_TC: () => void;
};

const Header = (props: PropsType) => {
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
