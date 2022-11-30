import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../routes';
import { TSignIn } from '../../../../types/TAuth';
import { signInSchema } from '../../../../utils/schemas/authSchema';
import Layout from '../../Layout/Layout';
import c from './../Auth.module.scss';

const Login = () => {
  const initialValues: TSignIn = { email: '', password: '' };

  return (
    <>
      <Layout>
        <div className={c.signInWrapper}>
          <h1 className='text-2xl mb-2'>Sign In</h1>
          <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}>
            {({ isSubmitting, errors, touched }) => (
              <Form className={c.form}>
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
