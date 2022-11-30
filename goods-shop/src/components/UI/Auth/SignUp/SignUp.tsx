import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../routes';
import { TSignUp } from '../../../../types/TAuth';
import { signUpSchema } from '../../../../utils/schemas/authSchema';
import Layout from '../../Layout/Layout';
import c from './../Auth.module.scss';

const SignUp = () => {
  const initialValues: TSignUp = {
    email: '',
    password: '',
    age: '',
    name: '',
    passwordConfirmation: '',
  };

  const returnFieldClass = (
    errorField: string | undefined,
    touchedField: boolean | undefined,
  ) => {
    return classNames(c.field, {
      [c.error__field]: errorField !== undefined && !!touchedField,
    });
  };

  return (
    <>
      <Layout>
        <div className={c.signInWrapper}>
          <h1 className='text-2xl mb-2'>Sign Up</h1>
          <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={signUpSchema}
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
                  name='name'
                  component='div'
                />
                <Field
                  className={returnFieldClass(errors.name, touched.name)}
                  placeholder='Name'
                  type='text'
                  name='name'
                />

                <ErrorMessage
                  className={c.error}
                  name='age'
                  component='div'
                />
                <Field
                  className={returnFieldClass(errors.age, touched.age)}
                  placeholder='Age'
                  type='number'
                  name='age'
                />

                <ErrorMessage
                  className={c.error}
                  name='email'
                  component='div'
                />
                <Field
                  className={returnFieldClass(errors.email, touched.email)}
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
                  className={returnFieldClass(
                    errors.password,
                    touched.password,
                  )}
                  placeholder='Password'
                  type='password'
                  name='password'
                />

                <ErrorMessage
                  className={c.error}
                  name='passwordConfirmation'
                  component='div'
                />
                <Field
                  className={returnFieldClass(
                    errors.passwordConfirmation,
                    touched.passwordConfirmation,
                  )}
                  placeholder='Confirm password'
                  type='password'
                  name='passwordConfirmation'
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
              Already have an account?{' '}
              <Link
                to={Routes.SignIn}
                className={c.link__offer}>
                Sign in here
              </Link>
            </h4>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
