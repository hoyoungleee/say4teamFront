import React from 'react';
import './Footer.css';
import insta from '../assets/insta.svg'
import youtube from '../assets/youtube.svg'

const Footer = () => {
  return (
    <>
      <div className='footerevery'>
        <div className='topblocks'>
          <div className='topone.one one'>
            <p className='footertitle'>CONTACT</p>
            <button className='topbutton'>실시간 상담하기</button>
            <p className='footerpage'>유선문의 02-6494-0707</p>
            <p className='footerpage'>
              월-금 11:00-17:00 (BREAK TIME 12:00-14:00)
            </p>
          </div>
          <div className='toptwo.two'>
            <p className='footertitle'>STORE</p>
            <button className='topbutton'>스토어 방문하기</button>
            <p className='footerpage'>서울 용산구 녹사평대로 32길 53</p>
            <p className='footerpage'>
              53, NOKSAPYEONG-DAERO 32-GIL, YONGSAN-GU, SEOUL
            </p>
          </div>
        </div>
        <div className='bottomblocks'>
          <div>
            <div className='firstbottonpage'>
              <div className='icons'>
              <img src={insta} className='instagramicon' />
              <img src={youtube} className='youtubeicon' />
              </div>
              <div className='agrees'>
              <span className='agree'>AGREEMENT </span>
              <span>PRIVACY POLICY</span>
              </div>
            </div>
            <div className='secondbottonpage'>
              <p className='company'>(주)투셰 서울시 용산구 녹사평대로 32길 53 대표이사: 임재린</p>
              <p>
                사업자 등록번호:{' '}
                <span className='companynum'>304-87-02196</span> 통신판매업신고:
                2021-서울용산-4381. +82 (0)2-6494-0707{' '}
                <span className='maillink'>mail@saytouche.kr</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
