import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FC } from 'react';

import { TFilter } from '../../redux/users-reducer';

type TProps = {
  onFilterChanged: (filter: TFilter) => void;
};

export const UsersSearchForm: FC<TProps> = React.memo((props) => {
  const usersSearchFormValidation = (values: any) => {
    const errors = {};
    return errors;
  };

  const formSubmit = (
    values: TFilter,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    props.onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: null as null | boolean }}
        validate={usersSearchFormValidation}
        onSubmit={formSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='term' />
            <Field as='select' name='friend'>
              <option value='null'>All</option>
              <option value='true'>Friends</option>
              <option value='false'>Non-followed</option>
            </Field>
            <button type='submit' disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
