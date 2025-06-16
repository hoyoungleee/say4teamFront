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
    setShowLangMenu((prev) => !prev);
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
          <div className='marquee-content'>
            {/* 여기에 실제 움직이고 싶은 모든 텍스트 내용을 한 세트로 작성합니다.
        예: <span>{t('slidertext1')}</span> <span>New Arrival: TOUCHÉ Diffuser</span> <span>다른 공지사항</span>
      */}
            <span>{t('slidertext1')}</span>
            <span>New Arrival: TOUCHÉ Diffuser</span>
            <span>특별 할인! 전 품목 20% 세일!</span>
            <span>배송 지연 안내: 6월 17일 발송부터 지연될 수 있습니다.</span>
            <span>신규 가입 시 웰컴 쿠폰 증정!</span>

            {/* ↑ 위의 내용과 동일한 내용 세트를 한 번 더 복사해서 붙여넣습니다.
        이렇게 하면 애니메이션이 -50% 지점으로 이동할 때, 두 번째 세트가 첫 번째 세트 자리를 대체하며 자연스럽게 이어집니다.
      */}
            <span>{t('slidertext1')}</span>
            <span>New Arrival: TOUCHÉ Diffuser</span>
            <span>특별 할인! 전 품목 20% 세일!</span>
            <span>배송 지연 안내: 6월 17일 발송부터 지연될 수 있습니다.</span>
            <span>신규 가입 시 웰컴 쿠폰 증정!</span>

            {/* (선택 사항) 만약 텍스트가 너무 짧아서 끊김이 느껴진다면,
        위의 두 세트를 포함한 전체 내용을 또 한 번(총 세 번) 복사해서 붙여넣는 것을 고려해 볼 수 있습니다.
        이렇게 하면 애니메이션 시간을 더 늘리면서도 자연스러운 연결을 유지할 수 있습니다.
        예:
        <span>{t('slidertext1')}</span> ... (첫 번째 세트)
        <span>{t('slidertext1')}</span> ... (두 번째 세트)
        <span>{t('slidertext1')}</span> ... (세 번째 세트)

        이 경우, @keyframes marquee의 translateX는 (-100% / 전체 세트 수)가 됩니다.
        만약 3세트를 반복한다면, transform: translateX(-33.333%); 가 될 것입니다.
        하지만 일반적으로 2세트 반복과 -50% 이동이 가장 흔하고 충분합니다.
      */}
          </div>
        </div>
      </div>

      {/* sticky nav */}
      <div className='nav'>
        <div className='navone'>
          <NavLink to='/company' className='comp'>
            company
          </NavLink>
          <NavLink to='/acahive' className='arch' style={{ fontSize: 12.5 }}>
            ARCHIVE
          </NavLink>
          <NavLink to='/shop' className='shop'>
            shop
          </NavLink>
          <NavLink to='/store' className='stor'>
            store
          </NavLink>
        </div>
        <div className='navtwo'>
          <NavLink to='/' className='sayt'>
            Saytouche
          </NavLink>
        </div>
        <div className='navthree'>
          <div className='language-container'>
            <p className='lang' onClick={toggleLangMenu}>
              language
            </p>
            {showLangMenu && (
              <div className='language-dropdown'>
                <button onClick={() => i18n.changeLanguage('ko')}>KOR</button>
                <button onClick={() => i18n.changeLanguage('en')}>ENG</button>
              </div>
            )}
          </div>

          <NavLink to='/contact' className='cont'>
            contact
          </NavLink>
          <div className='navfour'>
            <NavLink to='/cart' className='cart'>
              cart
            </NavLink>
          </div>
          <nav>
            {!isInit ? null : isLoggedIn ? (
              <p onClick={() => navigate('/mypage')} className='logn'>
                mypage
              </p>
            ) : (
              <p onClick={() => navigate('/login')} className='logn'>
                login
              </p>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
