import { number, object, ref, string } from 'yup';

export const signInSchema = object({
  email: string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(20, 'Password is too long - maximum 20 symbols allowed'),
});
export const signUpSchema = object({
  name: string().required('Name is required'),
  age: number().required('Age is required').positive().integer(),
  email: string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(20, 'Password is too long - maximum 20 symbols allowed')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password should consist of at least one uppercase letter, one lowercase letter, one number and one special character(@, ^, &...)',
    ),
  passwordConfirmation: string()
    .required('Confirm the password')
    .oneOf([ref('password'), null], 'Passwords must match'),
});
