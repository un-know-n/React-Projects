import { FC } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { logInUser_TC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { maxField, minField, requiredField } from '../../utils/validators/validators';
import { createField, FormControlElement } from '../common/FormsControls/FormsControls';
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

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

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
        {createField<LoginFormValuesTypeKeys>(
          'Email',
          'email',
          [requiredField, maxSymbols15, minSymbols3],
          Input,
          { type: 'email' },
        )}
        {createField<LoginFormValuesTypeKeys>(
          'Password',
          'password',
          [requiredField, maxSymbols15, minSymbols3],
          Input,
          { type: 'password' },
        )}
        {createField<LoginFormValuesTypeKeys>(
          '',
          'rememberMe',
          [],
          Input,
          { type: 'checkbox' },
          'remember me',
        )}
        <div>
          <button type='submit'>Login</button>
        </div>

        {captchaURL && <img src={captchaURL} alt='' />}
        {captchaURL &&
          createField<LoginFormValuesTypeKeys>(
            'Symbols from image',
            'captchaURL',
            [requiredField],
            Input,
            {},
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
