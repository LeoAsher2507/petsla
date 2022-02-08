import queryString from 'query-string';
import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosInstance;
