import React, { useEffect, useState } from 'react';
import './Main.css';
import TopSlider from './TopSlider';
import SecondSlider from './SecondSlider';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, PROD } from '../configs/host-config';

import img11 from '../assets/11.jpg';
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
    <div className='main-custom'>
      <TopSlider />

      <p className='mainsecondtitle'>TOUCHÉ Fragrance</p>

      <SecondSlider />

      <br />
      <br />

      <div className='fourmain'>
        <p className='fourmaintittle'>LIQUIFIED COLLECTION</p>
        <p className='foursertittle'>
          전통적인 페르시안 패턴을 세이투셰만의 형태감으로 재해석한 시그니처
          컬렉션
        </p>
      </div>

      <div className='fivemain'>
        <div>
          <img src={img11} className='fiveserone' alt='Liquified Collection' />
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
                  <p className='fivetext'>{t('main2')}</p>
                </div>
              </div>
              <div className='item'>
                <img src={img13} />
                <div>
                  <p className='fivetext'>Liquified Persian Rug Black</p>
                  <p className='fivetext'>{t('main2')}</p>
                </div>
              </div>
              <div className='item'>
                <img src={img14} />
                <div>
                  <p className='fivetext'>Liquified Gradient Rug Yellow</p>
                  <p className='fivetext'>{t('main2')}</p>
                </div>
              </div>
              <div className='item'>
                <img src={img15} />
                <div>
                  <p className='fivetex'>Liquified Persian Mouse Pad</p>
                  <p className='fivetext'>{t('main2')}</p>
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
            <p className='sixmainser'>{t('maintext1')}</p>
            <p className='sixmainsersecond'>{t('maintext2')}</p>
          </div>
        </div>
      </div>

        <div className='seveneighttitle'>
          <div>
            <p className='seventittle'>MD KEYWORD</p>
          </div>

          <div className='eightmain'>
            <div>
              <p className='eighttext'>{t('keyword1')}</p>
              <img src={img17} />
            </div>
            <div>
              <p className='eighttext'>{t('keyword2')}</p>
              <img src={img18} />
            </div>
            <div>
              <p className='eighttext'>{t('keyword3')}</p>
              <img src={img19} />
            </div>
            <div>
              <p className='eighttext'>{t('keyword4')}</p>
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
    </div>
  );
};

export default Main;
