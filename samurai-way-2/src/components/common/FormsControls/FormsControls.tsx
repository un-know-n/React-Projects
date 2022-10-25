import React, { FC } from 'react';
import { Field } from 'redux-form';
import { CommonFieldProps, WrappedFieldMetaProps } from 'redux-form/lib/Field';

import { ValidatorType } from '../../../utils/validators/validators';
import classes from './FormsControls.module.css';

type FormControlElementType = {
  input: CommonFieldProps;
  label: string;
  type: string;
  meta: WrappedFieldMetaProps;
  children?: JSX.Element;
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

//Another code

const FormControl: FC<FormControlElementType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div
      className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: FC<FormControlElementType> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<FormControlElementType> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<KeyNames extends string>(
  placeholder: string | undefined,
  name: KeyNames,
  validators: Array<ValidatorType>,
  component: FC<FormControlElementType>,
  props = {},
  text = '',
) {
  return (
    <div>
      <Field
        label={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
