import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='headermain'>
      {/* 상단 알림 */}
      <div className='topheader'>
        <p className='topheadertitle'>New Arrival: TOUCHÉ Diffuser</p>
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
          <p className='comp'>COMPANY</p>
          <p className='arch'>ARCHIVE</p>
          <p className='shop'>SHOP</p>
          <p className='stor'>STORE</p>
        </div>
        <div className='navtwo'>
          <p className='sayt'>Saytouche</p>
        </div>
        <div className='navthree'>
          <p className='lang'>LANGUAGE</p>
          <p className='cont'>CONTACT</p>
          <p className='cart'>CART</p>
          <p className='logn'>LOGIN</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
