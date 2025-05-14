import React from 'react';
import './JoinComplete.css';
import { useNavigate } from 'react-router-dom';

const JoinComplete = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <div className='join-page-container'>
      <h1 className='join-title'>Join</h1>
      <div className='join-steps'>
        <span className='join-step'>약관동의</span>
        <span className='join-step'>정보입력</span>
      </div>
      <div className='join-complete-msg'>회원가입이 완료되었습니다.</div>
      <button className='join-confirm-btn' onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default JoinComplete;
