import queryString from 'query-string';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5000,
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosInstance;
