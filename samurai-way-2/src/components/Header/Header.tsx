import 'antd/dist/antd.css';

import { Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';

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
      <Link to='/users'>Developers</Link>
      {/* <img src={headerLogo} alt='header-logo' /> */}
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} -
            <Button danger onClick={logOutBtn}>
              Log out
            </Button>
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
