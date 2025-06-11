import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorButton.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="error-page">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <button className="error-button" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
