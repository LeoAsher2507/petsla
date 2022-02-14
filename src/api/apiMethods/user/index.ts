import axiosInstance from 'src/api/axisInstance';
import { getLocalStorage } from 'src/utils/localStorage';

const userApiMethod = {
  getUserInfo: () => {
    const url = '/profile';
    return axiosInstance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getLocalStorage('token'),
      },
    });
  },
};

export default userApiMethod;
