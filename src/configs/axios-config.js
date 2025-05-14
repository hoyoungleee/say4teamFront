import axios from 'axios';
import { API_BASE_URL, USER } from './host-config';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// 외부에서 토큰을 수동으로 설정할 수 있는 함수
let authToken = ''; // 기본값은 빈 문자열

const setAuthToken = (token) => {
  authToken = token; // 외부에서 설정한 토큰을 변수에 저장
};

// 요청용 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 수동으로 설정된 토큰을 Authorization 헤더에 추가
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생 시 리젝션
  },
);

// 응답용 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답에 문제가 없으면 그대로 반환
  async (error) => {
    console.log('response interceptor 동작함! 응답에 문제가 발생!');
    console.log(error);

    if (error.response.data.message === 'NO_LOGIN') {
      console.log('로그인 상태가 아니므로 재발급 요청을 할 수 없음!');
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 401 응답이 오면, 토큰 재발급을 시도
    if (error.response.status === 401) {
      console.log('응답상태 401 발생! 토큰 재발급 필요!');

      try {
        const id = localStorage.getItem('USER_ID'); // 유저 아이디
        const res = await axios.post(`${API_BASE_URL}${USER}/refresh`, { id });

        const newToken = res.data.result.token; // 새로 받은 토큰
        localStorage.setItem('ACCESS_TOKEN', newToken); // 로컬 스토리지에 새 토큰 저장

        // 원래의 요청에 새 토큰을 설정
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`; // axios 인스턴스의 Authorization 헤더에도 새 토큰 설정

        // 새 토큰을 설정한 후 원래 요청을 재시도
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // refresh token이 만료되었거나 문제가 발생하면 로그아웃 처리
        localStorage.clear();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); // 그 외의 에러는 그대로 반환
  },
);

export { axiosInstance, setAuthToken };
