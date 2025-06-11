import React, { useContext, useState } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { isLoggedIn, isInit } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLangMenu = () => {
    setShowLangMenu(prev => !prev);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false); // 선택 후 메뉴 닫기
  };

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
            <span>{t('slidertext1')}</span>
          </div>
          <div className='marquee'>
            <span>New Arrival: TOUCHÉ Diffuser</span>
          </div>
          <div className='marquee'>
            <span>{t('slidertext1')}</span>
          </div>
          <div className='marquee'>
            <span>New Arrival: TOUCHÉ Diffuser</span>
          </div>
        </div>
      </div>

      {/* sticky nav */}
      <div className='nav'>
        <div className='navone'>
          <NavLink to='/company' className='comp'>company</NavLink>
          <NavLink to='/acahive' className='arch' style={{fontSize:12.5}}>ARCHIVE</NavLink>
          <NavLink to='/shop' className='shop'>shop</NavLink>
          <NavLink to='/store' className='stor'>store</NavLink>
        </div>
        <div className='navtwo'>
          <NavLink to='/' className='sayt'>Saytouche</NavLink>
        </div>
        <div className='navthree'>
          <div className='language-container'>
            <p className='lang' onClick={toggleLangMenu}>language</p>
            {showLangMenu && (
              <div className='language-dropdown'>
                <button onClick={() => i18n.changeLanguage('ko')}>KOR</button>
                <button onClick={() => i18n.changeLanguage('en')}>ENG</button>
              </div>
            )}
          </div>

          <NavLink to='/contact' className='cont'>contact</NavLink>
          <div className='navfour'>
            <NavLink to='/cart' className='cart'>cart</NavLink>
          </div>
          <nav>
            {!isInit ? null : isLoggedIn ? (
              <p onClick={() => navigate('/mypage')} className='logn'>mypage</p>
            ) : (
              <p onClick={() => navigate('/login')} className='logn'>login</p>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
