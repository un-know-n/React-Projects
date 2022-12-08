import classNames from 'classnames';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { app } from '../../../../api/firebase.api';
import { AuthContext } from '../../../../context/auth';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useUserAuth } from '../../../../hooks/useUserAuth';
import { Routes } from '../../../../routes';
import { TSignIn } from '../../../../types/TAuth';
import { takeAuthError } from '../../../../utils/helpers/auth/authErrors';
import { signInSchema } from '../../../../utils/schemas/authSchema';
import Layout from '../../Layout/Layout';
import c from './../Auth.module.scss';

const initialValues: TSignIn = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate();

  const { auth } = useAuthContext();

  const handleSubmit = async (
    values: TSignIn,
    formikHelpers: FormikHelpers<TSignIn>,
  ) => {
    formikHelpers.setSubmitting(true);
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`Welcome back, ${user.displayName || 'dear Customer'}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate(Routes.Home);
      })
      .catch((error: FirebaseError) => {
        const errorMessage = takeAuthError(error.code);
        formikHelpers.setStatus({
          error: `Error occured: ${errorMessage ?? error.code}`,
        });
      });
    formikHelpers.setSubmitting(false);
  };

  return (
    <>
      <Layout>
        <div className={c.signInWrapper}>
          <h1 className='text-2xl mb-2'>Sign In</h1>
          <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting, errors, touched, status }) => (
              <Form className={c.form}>
                {status && <div className={c.error}>{status.error}</div>}

                <ErrorMessage
                  className={c.error}
                  name='email'
                  component='div'
                />
                <Field
                  className={classNames(c.field, {
                    [c.error__field]:
                      errors.email !== undefined && !!touched.email,
                  })}
                  placeholder='Email'
                  type='email'
                  name='email'
                />

                <ErrorMessage
                  className={c.error}
                  name='password'
                  component='div'
                />
                <Field
                  className={classNames(c.field, {
                    [c.error__field]: !!errors.password && !!touched.password,
                  })}
                  placeholder='Password'
                  type='password'
                  name='password'
                />

                <button
                  className={c.button}
                  type='submit'
                  disabled={isSubmitting}>
                  Submit
                </button>
                <Link
                  to={Routes.Home}
                  className={c.button__back}>
                  Back
                </Link>
              </Form>
            )}
          </Formik>
          <div className={c.signUpOffer}>
            <Link
              to={Routes.ResetPassword}
              className={c.link__offer}>
              Forgot password?
            </Link>
          </div>
          <div className={c.signUpOffer}>
            <h4>
              Don&apos;t have an account?{' '}
              <Link
                to={Routes.SignUp}
                className={c.link__offer}>
                Create it in a few moments
              </Link>
            </h4>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
