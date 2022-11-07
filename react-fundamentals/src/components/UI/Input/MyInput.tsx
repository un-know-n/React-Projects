import React, { FC, forwardRef, ReactNode } from 'react';

import classes from './MyInput.module.css';

type Ref = HTMLInputElement;

export const MyInput = forwardRef<Ref, any>((props, ref) => {
  return <input ref={ref} {...props} className={classes.myInput} />;
});
