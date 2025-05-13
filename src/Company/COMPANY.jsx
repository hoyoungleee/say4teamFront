import React from 'react';
import './COMPANY.css';
import companybanner from '../assets/companyimage.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const COMPANY = () => {
  return (
    <>
      <Header />
      <div className='compage'>
        <div className='companyimage'>
          <img src={companybanner} />
        </div>
        <div className='companytext'>
          <p className='comtext1'>펜싱에서 상대 선수에게 득점을 내주었을 때 외치던 단어 ‘TOUCHÉ’.</p>
          <p className='comtext2'>
            이는 자신이 찔렸다는 것을 인정한다는 의미이며, 근래에는 상대방의
            말에 동의하는 하나의 표현으로 자리매김하였다.
          </p>
          <p className='comtext3'>
            세이투셰는 ‘제품과 작품 경계에 있는 디자인’ 이라는 모토로 일상
            속에서 접할 수 있는 다양한 아이템들을 그들만의 시각으로 재해석한다.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default COMPANY;
