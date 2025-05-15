// main 화면입니다.
import React from 'react';
import './Main.css';
import TopSlider from './TopSlider';
import SecondSlider from './SecondSlider';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';
import img15 from '../assets/15.jpg';
import img16 from '../assets/16.jpg';
import img17 from '../assets/17.jpeg';
import img18 from '../assets/18.jpg';
import img19 from '../assets/19.jpg';
import img20 from '../assets/20.jpg';
import img21 from '../assets/21.png';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='main-custom'>
        <div>
          <TopSlider />
        </div>
        <div>
          <p className='mainsecondtitle'>TOUCHÉ Fragrance</p>
        </div>
        <div>
          <SecondSlider />
        </div>
        <br />
        <br />
        <div className='fourmain'>
          <p className='fourmaintittle'>LIQUIFIED COLLECTION</p>
          <p className='foursertittle'>{t('main1')}</p>
        </div>
        <div>
          <div className='fivemain'>
            <div>
              <img src={img11} className='fiveserone' />
            </div>
            <div className='fivesertwo'>
              <div className='item'>
                <img src={img12} />
                <div>
                  <p className='fivetext'>Liquified Persian Rug Green</p>
                  <p className='fivetext'>170,000원</p>
                </div>
              </div>
              <div className='item'>
                <img src={img13} />
                <div>
                  <p className='fivetext'>Liquified Persian Rug Green</p>
                  <p className='fivetext'>170,000원</p>
                </div>
              </div>
              <div className='item'>
                <img src={img14} />
                <div>
                  <p className='fivetext'>Liquified Persian Rug Green</p>
                  <p className='fivetext'>170,000원</p>
                </div>
              </div>
              <div className='item'>
                <img src={img15} />
                <div>
                  <p className='fivetex'>Liquified Persian Rug Green</p>
                  <p className='fivetext'>170,000원</p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className='sixmain'>
            <p className='sixmaintittle'>JAGAE COLLECTION</p>
            <p className='sixmainser'>
              국내산 백자개를 엄선하여, 40년 이상 경력을 지닌 장인의 손끝에서
            </p>
            <p className='sixmainsersecond'>
              한 조각씩 절삭되고 정성스럽게 붙여지는 섬세한 공정과 정교한 마감을
              거쳐 완성되는 자개 컬렉션.
            </p>
          </div>
        </div>
        <div className='sevenbigmain'>
          <img src={img16} className='sevenmain' />
        </div>

        <div className='seveneighttitle'>
          <div>
            <p className='seventittle'>MD KEYWORD</p>
          </div>

          <div className='eightmain'>
            <div>
              <p className='eighttext'>#MD'S PICK #MD픽</p>
              <img src={img17} />
            </div>
            <div>
              <p className='eighttext'>#GIFT #기프트</p>
              <img src={img18} />
            </div>
            <div>
              <p className='eighttext'>#BLACK #블랙아이템</p>
              <img src={img19} />
            </div>
            <div>
              <p className='eighttext'>#DESKTERIOR #데스크테리어</p>
              <img src={img20} />
            </div>
          </div>
        </div>

        <div className='ninemain'>
          <NavLink to='/store'>
            <button className='ninebutton'>VISIT STORE</button>
          </NavLink>
        </div>

        <div className='ten'>
          <div className='tenimg'>
            <img src={img21} />
          </div>
          <div className='tentext'>
            <p>서울특별시 용산구 녹사평대로32길 53</p>
            <p>53, NOKSAPYEONG-DAERO 32-GIL, YONGSAN-GU, SEOUL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
