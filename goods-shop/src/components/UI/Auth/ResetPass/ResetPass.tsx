import classNames from 'classnames';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '../../../../hooks/useAuthContext';
import { Routes } from '../../../../routes';
import { takeAuthError } from '../../../../utils/helpers/auth/authErrors';
import { resetPassSchema } from '../../../../utils/schemas/authSchema';
import Layout from '../../Layout/Layout';
import c from './../Auth.module.scss';

const initialValues = {
  email: '',
};

const ResetPass = () => {
  const { auth } = useAuthContext();

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    formikHelpers.setSubmitting(true);
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast.success(`Email sent successfully, check it!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
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
          <h1 className='text-2xl mb-2'>Reset password</h1>
          <Formik
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={resetPassSchema}
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

                <button
                  className={c.button}
                  type='submit'
                  disabled={isSubmitting}>
                  Submit
                </button>
                <Link
                  to={Routes.SignIn}
                  className={c.button__back}>
                  Back to Login
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </>
  );
};

export default ResetPass;
