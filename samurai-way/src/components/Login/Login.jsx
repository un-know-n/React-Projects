import classes from './Login.module.css';
import { Field, reduxForm } from 'redux-form';

const Login = (props) => {
  const onSubmitLogin = (formData) => {
    console.log(formData);
  };

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
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder='Login' component={'input'} name={'login'} />
        </div>
        <div>
          <Field placeholder='Password' component={'input'} name={'password'} />
        </div>
        <div>
          <Field component={'input'} type={'checkbox'} name={'rememberMe'} />
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

export default Login;
