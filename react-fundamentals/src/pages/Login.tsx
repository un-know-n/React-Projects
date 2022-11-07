import React, { FormEvent, FormEventHandler, useContext } from 'react';

import { MyButton } from '../components/UI/Button/MyButton';
import { AuthContext } from '../context';
import { MyInput } from './../components/UI/Input/MyInput';

export {};

export const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <>
      <div>
        <h1>Login page</h1>
        <form onSubmit={login}>
          <MyInput type="text" placeholder="Enter the name" />
          <MyInput type="password" placeholder="Enter the password" />
          <MyButton>Enter</MyButton>
        </form>
      </div>
    </>
  );
};
