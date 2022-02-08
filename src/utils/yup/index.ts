import * as yup from 'yup';

// const username_pattern = /^(?=.{8,20}$)[a-zA-Z0-9]+$/;

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, 'Username must be between 8-20 characters!')
    .max(20, 'Username must be between 8-20 characters!')
    .required('Username is required!'),

  password: yup
    .string()
    .min(8, 'Password must be between 8-20 characters!')
    .max(20, 'Password must be between 8-20 characters!')
    .required('Password is required!'),
});

// .matches(
//   username_pattern,
//   'Invalid user name Only letters and numbers are allowed!'
// )
