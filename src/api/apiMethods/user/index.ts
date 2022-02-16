import axiosInstance from 'src/api/axisInstance';
import { IRequestedOrder } from 'src/types/productTypes';
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

  addOrder: (order: IRequestedOrder) => {
    const url = `/add-order/`;
    return axiosInstance.post(url, order, {
      headers: {
        Authorization: 'Bearer ' + getLocalStorage('token'),
      },
    });
  },

  getAllOrder: () => {
    const url = '/get-order';
    return axiosInstance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getLocalStorage('token'),
      },
    });
  },

  getOneOrder: (id: number) => {
    const url = `order/${id}`;
    return axiosInstance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getLocalStorage('token'),
      },
    });
  },
};

export default userApiMethod;
