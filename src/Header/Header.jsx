import React, { useContext } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/UserContext';

const Header = () => {
  const { isLoggedIn, isInit } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='headermain'>
      {/* 상단 알림 */}
      <div className='topheader'>
        <p className='topheadertitle'>New Arrival: Doodle Persian Collection</p>
      </div>

      {/* 움직이는 공지 */}
      <div className='custom-header'>
        <div className='marquee-wrapper'>
          <div className='marquee'>
            <span>카카오톡 신규 가입 시 10,000원 쿠폰 (수신 동의 필수)</span>
          </div>
          <div className='marquee'>
            <span>New Arrival: TOUCHÉ Diffuser</span>
          </div>
          <div className='marquee'>
            <span>카카오톡 신규 가입 시 10,000원 쿠폰 (수신 동의 필수)</span>
          </div>
          <div className='marquee'>
            <span>New Arrival: TOUCHÉ Diffuser</span>
          </div>
        </div>
      </div>

      {/* sticky 적용된 nav */}
      <div className='nav'>
        <div className='navone'>
          <NavLink to='/company' className='comp'>
            COMPANY
          </NavLink>
          <p className='arch'>ARCHIVE</p>
          <NavLink to='/shop' className='shop'>
            SHOP
          </NavLink>
          <NavLink to='/store' className='stor'>
            STORE
          </NavLink>
        </div>
        <div className='navtwo'>
          <NavLink to='/' className='sayt'>
            Saytouche
          </NavLink>
        </div>
        <div className='navthree'>
          <p className='lang'>LANGUAGE</p>
          <NavLink to='/contact' className='cont'>
            CONTACT
          </NavLink>
          <div className='navfour'>
            <NavLink to='/cart' className='cart'>
              CART
            </NavLink>
          </div>
          <nav>
            {!isInit ? null : isLoggedIn ? (
              <>
                <p onClick={() => navigate('/mypage')} className='logn'>
                  MYPAGE
                </p>
              </>
            ) : (
              <p onClick={() => navigate('/login')} className='logn'>
                LOGIN
              </p>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
