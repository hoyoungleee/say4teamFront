import axios from 'axios';
import { API_BASE_URL, USER } from './host-config';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('response interceptor 동작. 응답 문제 발생!');
    console.log(error);

    if (error.response.data.message === 'NO_LOGIN') {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const id = localStorage.getItem('USER_ID');

        const res = await axios.post(`${API_BASE_URL}${USER}/refresh`, {
          id,
        });
        const newToken = res.data.result.token;
        localStorage.setItem('ACCESS_TOKEN', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
