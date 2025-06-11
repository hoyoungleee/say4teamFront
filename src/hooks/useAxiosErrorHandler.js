import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios-config';
import { handleAxiosError } from '../handleAxiosError';

const useAxiosErrorHandler = (onLogout) => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        try {
          handleAxiosError(error, onLogout, navigate);
          // handleAxiosError에서 throw하면 catch로 빠짐.
          return Promise.reject(error);
        } catch (err) {
          // handleAxiosError가 throw한 에러 여기서 받음
          return Promise.reject(err);
        }
      },
    );

    return () => {
      // 컴포넌트 언마운트 시 인터셉터 제거
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, onLogout]);
};

export default useAxiosErrorHandler;
