import axiosInstance from 'src/services/axiosInstance';
import {
  ILoginRequestData,
  IRegisterRequestData,
} from 'src/shared/types/userType';

export const authApiMethod = {
  login: (data: ILoginRequestData) => {
    const url = '/login';
    return axiosInstance.post(url, data);
  },

  register: (data: IRegisterRequestData) => {
    const url = '/register/';
    return axiosInstance.post(url, data);
  },
};
