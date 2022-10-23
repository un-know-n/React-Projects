import React from 'react';
import { CommonFieldProps, WrappedFieldMetaProps } from 'redux-form/lib/Field';

import classes from './FormsControls.module.css';

type FormControlElementType = {
  input: CommonFieldProps;
  label: string;
  type: string;
  meta: WrappedFieldMetaProps;
};

export const FormControlElement = (Element: any) => {
  return ({ input, meta, label, type }: FormControlElementType): any => {
    const hasError = meta.error && meta.touched;
    return (
      <div
        className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
        <Element {...input} placeholder={label} type={type} />
        {hasError ? <span>{meta.error}</span> : ''}
      </div>
    );
  };
};
