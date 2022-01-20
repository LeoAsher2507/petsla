export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface IRegisterRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
