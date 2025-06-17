import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { API_BASE_URL, USER } from '../configs/host-config';
import AuthContext from '../context/UserContext';
import kakaoLoginBtn from '../assets/kakaoLoginButton.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // 환경변수 가져오기
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const handleMessage = (e) => {
      // origin (브라우저 호스트 주소)을 비교하여 이벤트 발생 상황 외에는 동작하지 않게
      if (
        e.origin !== 'http://localhost:8000' &&
        e.origin !== window.location.origin
      )
        return;

      if (e.data.type === 'OAUTH_SUCCESS') {
        const { token, id, email, role, provider } = e.data;
        alert('카카오 로그인 성공');

        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('EMAIL', email);
        localStorage.setItem('USER_ID', id);
        localStorage.setItem('ROLE', role);
        localStorage.setItem('PROVIDER', provider);

        onLogin(e.data);
        navigate('/member/join-complete');
      }
    };
    // 브라우저에 이벤트 바인딩 -> 백엔드에서 postMessage를 통해 부모 창으로 데이터를 전송한다.
    // 부모창에 message 를 수신하는 이벤트를 지정해서 해당 데이터를 읽어온다.
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLogin, navigate]);

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 클릭!');
    //로그인 팝업창 열기
    const popup = window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login`,
      'kakao-login',
      'width=500,height=600,scrollbars=yes,resizable=yes',
    );
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoin = () => {
    navigate('/member/join');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}${USER}/doLogin`, {
        email: form.email,
        password: form.password,
      });

      const resData = response.data;

      if (!resData || !resData.result) {
        alert(resData.StatusMessage || '로그인에 실패했습니다.');
        return;
      }

      const { token, email, id, role, phone, address, birthDate } =
        resData.result;

      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('EMAIL', email);
      localStorage.setItem('USER_ID', id);
      localStorage.setItem('ROLE', role);
      localStorage.setItem('PHONE', phone);
      localStorage.setItem('ADDRESS', address);
      localStorage.setItem('BIRTH_DATE', birthDate);

      onLogin({ token, email, id, role, phone, address, birthDate });

      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>

      <div className='login-form'>
        <span>ID</span>
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          className='login-input'
        />
        <span>PASSWORD</span>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          className='login-input'
        />

        <div className='login-save'>
          <label htmlFor='save-id'>
            <input type='checkbox' id='save-id' />
            아이디 저장
          </label>
        </div>

        <button className='login-btn' onClick={handleLogin}>
          LOGIN
        </button>

        <div className='login-links'>
          <a href='#'>FORGOT ID / PW</a>
          <a href='#' onClick={handleJoin}>
            JOIN
          </a>
          <a href='#'>비회원 주문조회</a>
        </div>

        <div className='sns-login'>
          <img
            src={kakaoLoginBtn}
            onClick={handleKakaoLogin}
            className='kakao'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
