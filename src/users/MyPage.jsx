import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import AuthContext from '../context/UserContext';

const MyPage = () => {
  const navigate = useNavigate();
  const { onLogout } = useContext(AuthContext);

  const handleLogout = () => {
    onLogout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className='mypage-container'>
      <h2 className='mypage-title'>My Page</h2>
      <div className='mypage-grid'>
        <div className='mypage-item' onClick={() => navigate('/OrderCheck')}>
          Order list
        </div>
        <div className='mypage-item'>Wishlist</div>
        <div
          className='mypage-item'
          onClick={() => navigate('/mypage/profile')}
        >
          Profile
        </div>
        <div className='mypage-item'>Coupon</div>
        <div className='mypage-item'>Mileage</div>
        <div className='mypage-item' onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default MyPage;
