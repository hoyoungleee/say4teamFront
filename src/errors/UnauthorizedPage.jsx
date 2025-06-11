import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorButton.css';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>401 - 인증이 필요합니다.</h1>
      <p>로그인이 필요하거나 권한이 없습니다.</p>
      <button className="error-button" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default UnauthorizedPage;
