import classes from './Header.module.css';
import headerLogo from '../../assets/images/header-logo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src={headerLogo} alt='header-logo' />
      <div className={classes.loginBlock}>
        {props.isAuth ? props.login : <NavLink to='/login'></NavLink>}
      </div>
    </header>
  );
};

export default Header;
