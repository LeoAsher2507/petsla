export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface IRegisterRequestData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface ILoginResponseData {
  refresh: string;
  access: string;
  id: number;
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export interface ILoginResponseError {
  detail: string;
}
