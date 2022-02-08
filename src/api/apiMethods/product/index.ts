import { axiosInstance } from 'src/api/axisInstance';

const productApiMethod = {
  getAll: () => {
    const url = '/products/';
    return axiosInstance.get(url);
  },

  getOne: (id: string) => {
    const url = `product/${id}`;
    return axiosInstance.get(url);
  },
};

export default productApiMethod;
