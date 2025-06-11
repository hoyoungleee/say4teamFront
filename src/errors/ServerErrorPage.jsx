import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorButton.css';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>500 - 서버 내부 오류</h1>
      <p>서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      <button className="error-button" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ServerErrorPage;
