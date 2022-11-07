import React, { FC, ReactNode } from 'react';

import classes from './MyButton.module.css';

export const MyButton: FC<any> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
