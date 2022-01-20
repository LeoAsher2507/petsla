import axiosInstance from 'src/api/axisInstance';
import { ILoginRequestData, IRegisterRequestData } from 'src/types/userType';

const authApiMethod = {
  login: (data: ILoginRequestData) => {
    const url = '/login';
    console.log("aaaaaa", process.env.PUBLIC_URL);
    return axiosInstance.post(url, data);
  },

  register: (data: IRegisterRequestData) => {
    const url = '/register/';
    return axiosInstance.post(url, data);
  },
};

export default authApiMethod