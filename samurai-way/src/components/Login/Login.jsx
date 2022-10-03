import classes from './Login.module.css';
import { Field, reduxForm } from 'redux-form';
import { FormControlElement } from '../common/FormsControls/FormsControls';
import {
  maxField,
  minField,
  requiredField,
} from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { logInUser_TC } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const maxSymbols15 = maxField(30);
const minSymbols3 = minField(3);

const Input = FormControlElement('input');

const Login = (props) => {
  const onSubmitLogin = ({ email, password, rememberMe }) => {
    props.logInUser_TC(email, password, rememberMe);
  };

  if (props.isAuth) return <Navigate to='/profile' />;

  return (
    <div className={classes.loginWrapper}>
      <h1>Login in here</h1>
      <LoginReduxForm onSubmit={onSubmitLogin} />
    </div>
  );
};

const LoginForm = (props) => {
  return (
    <>
      {props.error ? <div className={classes.error}>{props.error}</div> : ''}
      <form onSubmit={props.handleSubmit}>
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
      </form>
    </>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const mapState = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapState, { logInUser_TC })(Login);
