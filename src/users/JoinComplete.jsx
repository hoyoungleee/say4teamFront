import React from "react";
import "./JoinPage.css";

const JoinComplete = () => {
  return (
    <div className="join-page-container">
      <h1 className="join-title">Join</h1>
      <div className="join-steps">
        <span className="join-step">약관동의</span>
        <span className="join-step">정보입력</span>
      </div>
      <div className="join-complete-msg">회원가입이 완료되었습니다.</div>
    </div>
  );
};

export default JoinComplete;
