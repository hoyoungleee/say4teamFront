import React, { useEffect, useState } from 'react';
import './Main.css';
import TopSlider from './TopSlider';
import SecondSlider from './SecondSlider';
import img11 from '../assets/11.jpg';
import img16 from '../assets/16.jpg';
import img17 from '../assets/17.jpeg';
import img18 from '../assets/18.jpg';
import img19 from '../assets/19.jpg';
import img20 from '../assets/20.jpg';
import img21 from '../assets/21.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_BASE_URL, PROD } from '../configs/host-config';

const Main = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 환율(원 → 달러) 예시 값
  const USD_KRW_RATE = 1300;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}${PROD}/list`, {
        params: {
          sort: 'productId,DESC',
          page: 0,
          size: 4,
          searchType: 1,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {
        console.error('메인 상품 불러오기 실패', err);
      });
  }, []);

  const handleClick = (productId) => {
    navigate(`/product/detail/${productId}`);
  };

  // 언어가 영어면 USD, 아니면 KRW로 처리
  const currency = i18n.language === 'en' ? 'USD' : 'KRW';

  // 가격 포맷 함수
  const formatPrice = (price, currency) => {
    if (currency === 'USD') {
      const dollarPrice = price / USD_KRW_RATE;
      return dollarPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
    } else {
      return price.toLocaleString('ko-KR') + '원';
    }
  };

  const filledProducts = [...products];
  while (filledProducts.length < 4) {
    filledProducts.push(null);
  }

  return (
    <>
      <div className='main-custom'>
        <TopSlider />

        <p className='mainsecondtitle'>TOUCHÉ Fragrance</p>
        <SecondSlider />

        <br />
        <br />
        <div className='fourmain'>
          <p className='fourmaintittle'>LIQUIFIED COLLECTION</p>
          <p className='foursertittle'>{t('main1')}</p>
        </div>

        <div className='fivemain'>
          <div>
            <img src={img11} className='fiveserone' />
          </div>

          <div className='fivesertwo'>
            {filledProducts.map((product, index) => (
              <div
                className='item'
                key={product?.id ?? `empty-${index}`}
                onClick={() => product && handleClick(product.id)}
                style={{
                  cursor: product ? 'pointer' : 'default',
                  opacity: product ? 1 : 0,
                }}
              >
                {product ? (
                  <>
                    <img src={product.thumbnailPath} alt={product.name} />
                    <div>
                      <p className='fivetext'>{product.name}</p>
                      <p className='fivetext'>
                        {formatPrice(product.price, currency)}
                      </p>
                    </div>
                  </>
                ) : (
                  <div style={{ width: '25vw', height: '25vw' }}></div>
                )}
              </div>
            ))}
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

        <div className='sevenbigmain'>
          <img src={img16} className='sevenmain' />
        </div>

        <div className='seveneighttitle'>
          <p className='seventittle'>MD KEYWORD</p>

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
    </>
  );
};

export default Main;
