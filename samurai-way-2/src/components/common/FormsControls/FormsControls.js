import classes from './FormsControls.module.css';

export const FormControlElement = (Element) => {
  return ({ input, meta, label, type }, ...props) => {
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
