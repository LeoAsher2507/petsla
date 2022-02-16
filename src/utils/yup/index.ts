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

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),

  lastName: yup.string().required('Last name is required!'),

  email: yup.string().required('Email is required!'),

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

export const userInfoSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  name: yup.string().required('Last name is required!'),
  gender: yup.string(),
  username: yup
    .string()
    .min(8, 'Username must be between 8-20 characters!')
    .max(20, 'Username must be between 8-20 characters!')
    .required('Username is required!'),
  email: yup.string().required('Email is required!'),
  phoneNumber: yup.string(),
});

export const customerInfoPageSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required!')
    .matches(/^\w+[\s*\w*]+$/, "Full name isn't valid!"),
  phoneNumber: yup
    .string()
    .required('Phone number is required!')
    .matches(/^[0-9]+$/, 'Phone number must be number!'),
  address: yup.string().required('Address is required!'),
  note: yup.string(),
});

// .matches(
//   username_pattern,
//   'Invalid user name Only letters and numbers are allowed!'
// )
