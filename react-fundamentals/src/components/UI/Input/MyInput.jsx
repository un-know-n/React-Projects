import React, { FC } from 'react';

import classes from './MyInput.module.css';

export const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} className={classes.myInput} />;
});
