import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
  userInfo: null, // userInfo 초기 값 수정
  isInit: false,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // userInfo 상태 추가
  const [isInit, setIsInit] = useState(false); // 초기화 완료 상태 추가

  const loginHandler = (loginData) => {
    console.log(loginData);

    // 로그인 시 사용자 정보를 로컬스토리지에 저장
    localStorage.setItem('ACCESS_TOKEN', loginData.token);
    localStorage.setItem('USER_ID', loginData.id);
    localStorage.setItem('USER_ROLE', loginData.role);
    localStorage.setItem('USER_EMAIL', loginData.email);

    // 사용자 정보 설정
    setUserInfo({
      email: loginData.email,
      id: loginData.id,
      role: loginData.role,
      name: loginData.name, // 예시로 name을 추가
    });

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.clear(); // 로컬스토리지 전체 삭제
    setIsLoggedIn(false);
    setUserInfo(null); // userInfo 초기화
  };

  useEffect(() => {
    // 로컬스토리지에 ACCESS_TOKEN이 있으면 자동 로그인 상태로 설정
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLoggedIn(true);
      setUserInfo({
        email: localStorage.getItem('USER_EMAIL'),
        id: localStorage.getItem('USER_ID'),
        role: localStorage.getItem('USER_ROLE'),
      });
    }
    setIsInit(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        userInfo,
        isInit,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
