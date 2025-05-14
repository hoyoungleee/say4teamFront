import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';
import { AuthContextProvider } from './context/UserContext';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
axios.defaults.withCredentials = true;

export default axios;

let isRefreshing = false;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 Access Token일 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.post('/user/token/refresh', { id: userId });

        const newToken = res.data.data.token;

        // 새 토큰 저장
        localStorage.setItem('token', newToken);

        // Authorization 헤더 업데이트 후 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshErr) {
        console.error('토큰 재발급 실패', refreshErr);
        localStorage.removeItem('token');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
