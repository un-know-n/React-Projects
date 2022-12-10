import classNames from 'classnames';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { values } from 'lodash';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '../../../../hooks/useAuthContext';
import { Routes } from '../../../../routes';
import { TSignUp } from '../../../../types/TAuth';
import { takeAuthError } from '../../../../utils/helpers/auth/authErrors';
import { errorToast } from '../../../../utils/helpers/toasts';
import { successToast } from '../../../../utils/helpers/toasts';
import { signUpSchema } from '../../../../utils/schemas/authSchema';
import Layout from '../../Layout/Layout';
import c from './../Auth.module.scss';
import PhoneField from './PhoneField';

export const initialValues: TSignUp = {
  email: '',
  password: '',
  phone: '',
  name: '',
  passwordConfirmation: '',
};

export const returnFieldClass = (
  errorField: string | undefined,
  touchedField: boolean | undefined,
) => {
  return classNames(c.field, {
    [c.error__field]: errorField !== undefined && !!touchedField,
  });
};

const SignUp = () => {
  const navigate = useNavigate();

  const { auth } = useAuthContext();

  const handleSubmit = async (
    values: TSignUp,
    formikHelpers: FormikHelpers<TSignUp>,
  ) => {
    formikHelpers.setSubmitting(true);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: values.name,
          photoURL: values.phone,
        })
          .then(() => {
            successToast(`Greetings, ${user.displayName || 'dear Customer'}!`);
            navigate(Routes.Profile);
          })
          .catch((error: FirebaseError) => {
            const errorMsg = takeAuthError(error.code);
            errorToast(`Error occured, ${errorMsg || error.code}`);
            navigate(Routes.Home);
          });
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
          <h1 className='text-2xl mb-2'>Sign Up</h1>
          <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting, errors, touched, status }) => (
              <Form className={c.form}>
                {status && <div className={c.error}>{status.error}</div>}

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
                  name='phone'
                  component='div'
                />
                <Field
                  component={PhoneField}
                  name='phone'
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
