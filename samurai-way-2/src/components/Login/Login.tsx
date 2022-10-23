import { FC } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { logInUser_TC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { maxField, minField, requiredField } from '../../utils/validators/validators';
import { FormControlElement } from '../common/FormsControls/FormsControls';
import classes from './Login.module.css';

const maxSymbols15 = maxField(30);
const minSymbols3 = minField(3);

const Input = FormControlElement('input');

type MapStatePropsType = {
  isAuth: boolean;
  captchaURL: string | null;
};

type MapDispatchPropsType = {
  logInUser_TC: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
  ) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaURL: string;
};

type LoginOwnProps = {
  captchaURL: string | null;
};

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmitLogin = (formData: LoginFormValuesType) => {
    props.logInUser_TC(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captchaURL,
    );
  };

  if (props.isAuth) return <Navigate to='/profile' />;

  return (
    <div className={classes.loginWrapper}>
      <h1>Login in here</h1>
      <LoginReduxForm captchaURL={props.captchaURL} onSubmit={onSubmitLogin} />
    </div>
  );
};

const LoginForm: FC<
  InjectedFormProps<LoginFormValuesType, LoginOwnProps> & LoginOwnProps
> = ({ error, handleSubmit, captchaURL }) => {
  return (
    <>
      {error ? <div className={classes.error}>{error}</div> : ''}
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            label='Email'
            component={Input}
            name='email'
            type='email'
            validate={[requiredField, maxSymbols15, minSymbols3]}
          />
        </div>
        <div>
          <Field
            label='Password'
            component={Input}
            name='password'
            type='password'
            validate={[requiredField, maxSymbols15, minSymbols3]}
          />
        </div>
        <div>
          <Field component={Input} type='checkbox' name='rememberMe' />
          remember me
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>

        {captchaURL && (
          <div>
            <img src={captchaURL} />
            <Field
              component={Input}
              name='captchaURL'
              type='text'
              validate={[requiredField]}
            />
          </div>
        )}
      </form>
    </>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginOwnProps>({
  form: 'login',
})(LoginForm);

const mapState = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
  };
};

export default connect(mapState, { logInUser_TC })(Login);
