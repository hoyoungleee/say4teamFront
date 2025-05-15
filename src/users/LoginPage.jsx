import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { API_BASE_URL, USER } from '../configs/host-config';
import AuthContext from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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

      const { token, email, id, role, phone, address } = resData.result;

      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('EMAIL', email);
      localStorage.setItem('LOGIN_ID', id);
      localStorage.setItem('ROLE', role);
      localStorage.setItem('PHONE', phone);
      localStorage.setItem('ADDRESS', address);

      onLogin({ token, email, id, role, phone, address });

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
          <button className='naver'>N 네이버 간편로그인</button>
          <button className='google'>G Google 로그인</button>
          <button className='kakao'>K 카카오톡 로그인</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
