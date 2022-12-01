import { FieldProps } from 'formik';
import React, { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { TSignUp } from '../../../../types/TAuth';
import { returnFieldClass } from './SignUp';

const PhoneField = (props: FieldProps<any, TSignUp>) => {
  const [value, setValue] = useState(props.field.value || '');

  useEffect(() => {
    if (value) props.form.setFieldValue(props.field.name, value);
  }, [value]);

  return (
    <>
      <PhoneInput
        international
        defaultCountry='UA'
        placeholder='Phone number'
        className={returnFieldClass(
          props.form.errors.phone,
          props.form.touched.phone,
        )}
        error={
          value
            ? isValidPhoneNumber(value)
              ? undefined
              : 'Invalid phone number'
            : 'Phone number required'
        }
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default PhoneField;
