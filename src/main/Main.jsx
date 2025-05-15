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

const Main = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  // 항상 4개로 맞추기
  const filledProducts = [...products];
  while (filledProducts.length < 4) {
    filledProducts.push(null);
  }

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
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </>
              ) : (
                <div style={{ width: '25vw', height: '25vw' }}></div> // 공백 자리
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
        <p className='sixmainser'>
          국내산 백자개를 엄선하여, 40년 이상 경력을 지닌 장인의 손끝에서
        </p>
        <p className='sixmainsersecond'>
          한 조각씩 절삭되고 정성스럽게 붙여지는 섬세한 공정과 정교한 마감을
          거쳐 완성되는 자개 컬렉션.
        </p>
      </div>

      <div className='sevenbigmain'>
        <img src={img16} className='sevenmain' alt='Jagae Collection' />
      </div>

      <div className='seveneighttitle'>
        <p className='seventittle'>MD KEYWORD</p>

        <div className='eightmain'>
          <div>
            <p className='eighttext'>#MD'S PICK #MD픽</p>
            <img src={img17} alt='#MD PICK' />
          </div>
          <div>
            <p className='eighttext'>#GIFT #기프트</p>
            <img src={img18} alt='#GIFT' />
          </div>
          <div>
            <p className='eighttext'>#BLACK #블랙아이템</p>
            <img src={img19} alt='#BLACK' />
          </div>
          <div>
            <p className='eighttext'>#DESKTERIOR #데스크테리어</p>
            <img src={img20} alt='#DESKTERIOR' />
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
          <img src={img21} alt='Store Location' />
        </div>
        <div className='tentext'>
          <p>서울특별시 용산구 녹사평대로32길 53</p>
          <p>53, NOKSAPYEONG-DAERO 32-GIL, YONGSAN-GU, SEOUL</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
