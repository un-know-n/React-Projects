import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../context';
import { MyButton } from '../Button/MyButton';
import cl from './Navbar.module.css';

export const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
  };

  return (
    <div className={cl.navbar}>
      <div className={cl.navbar__links}>
        <Link className={cl.navbar__link} to="/about">
          About
        </Link>
        <Link className={cl.navbar__link} to="/posts">
          Posts
        </Link>
      </div>
      {isAuth ? (
        <div className={cl.navbar__buttons}>
          <MyButton onClick={logout}>Log out</MyButton>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
