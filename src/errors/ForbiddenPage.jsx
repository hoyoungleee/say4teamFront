import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorButton.css';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>403 - 접근이 거부되었습니다.</h1>
      <p>이 페이지에 접근할 권한이 없습니다.</p>
      <button className="error-button" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ForbiddenPage;
