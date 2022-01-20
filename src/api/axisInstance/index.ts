import queryString from 'query-string';
import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosInstance;
