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
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('response interceptor 동작함! 응답에 문제가 발생!');
    console.log(error);

    if (error.response.data.message === 'NO_LOGIN') {
      console.log('아예 로그인을 하지 않아서 재발급 요청 들어갈 수 없음!');
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401) {
      console.log('응답상태 401 발생! 토큰 재발급 필요!');

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
  },
);

export default axiosInstance;
