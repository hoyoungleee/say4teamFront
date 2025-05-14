import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './Orderpages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AuthContext from '../context/UserContext'; // AuthContext import
import axiosInstance from '../configs/axios-config';

const Orderpages = () => {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  const [email, setEmail] = useState({
    id: '',
    domain: '',
    customDomain: '',
  });

  const [emailAddress, setEmailAddress] = useState('');
  const [address1, setAddress1] = useState('');

  // useNavigate 훅을 사용하여 navigate 함수를 가져옴
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Orderpages 렌더링됨');
    console.log('userInfo:', userInfo);

    // 회원정보와 동일시 선택 시 자동으로 값 설정
    if (userInfo) {
      setEmailAddress(userInfo?.email || '');
      setAddress1(userInfo?.address || '');
    }
  }, [userInfo]);

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleDomainSelect = (e) => {
    const selected = e.target.value;
    if (selected === '직접입력') {
      setEmail((prev) => ({
        ...prev,
        domain: '',
        customDomain: '',
      }));
    } else {
      setEmail((prev) => ({
        ...prev,
        domain: selected,
        customDomain: '',
      }));
    }
  };

  const handleRadioChange = (e) => {
    const selected = e.target.value;
    console.log('Radio 선택됨:', selected);

    if (selected === '회원정보와동일시') {
      console.log('userInfo로부터 입력값 설정');
      setEmailAddress(userInfo?.email || '');
      setAddress1(userInfo?.address || '');
    } else {
      setEmailAddress('');
      setAddress1('');
    }
  };

  const domainOptions = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'hanmail.net',
    '직접입력',
  ];

  // 예시로 주문 생성 후 결제 페이지로 이동하는 코드 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${ORDER}/create`,
        {
          cartItems,
          totalPrice,
          emailAddress,
          address1,
        },
      );
      // 주문 생성 성공 후 다른 페이지로 이동
      // navigate('/order/success'); // 예시로 주문 성공 페이지로 이동
    } catch (err) {
      console.error('주문 생성 실패:', err);
    }
  };

  return (
    <>
      <Header />
      <div className='orderbigpage'>
        <p>Order</p>
        <form className='formbox' onSubmit={handleSubmit}>
          <input
            type='radio'
            name='inputadd'
            value='회원정보와동일시'
            className='inputpart'
            onChange={handleRadioChange}
          />
          회원 정보와 동일
          <input
            type='radio'
            name='inputadd'
            value='새로운배송지'
            className='inputpart afterbox'
            onChange={handleRadioChange}
          />
          새로운 배송지
          <div className='ordernamemain'>
            <label htmlFor='emailAddress' className='username'>
              이메일
            </label>
            <input
              type='email'
              id='emailAddress'
              name='emailAddress'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className='ordernummain'>
            <label htmlFor='address1'>주소</label>
            <input
              type='text'
              id='address1'
              name='address1'
              placeholder='기본 주소 (직접 입력)'
              className='addresspart'
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className='ordertotalbox'>
            <p>주문 상품</p>
            {cartItems &&
              cartItems.map((item, index) => (
                <div key={index} className='cart-item'>
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className='cart-img'
                  />
                  <div className='cart-item-details'>
                    <p>{item.productName}</p>
                    <p>수량: {item.quantity}개</p>
                    <p>단가: {item.unitPrice.toLocaleString()}원</p>
                    <p>
                      총액: {(item.unitPrice * item.quantity).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className='ordertotalbox'>
            <p className='totalordertitle'>결제 정보</p>
            <div className='totalordertitleser'>
              <p>결제금액</p>
              <div>
                {cartItems &&
                  cartItems.map((item, index) => (
                    <span key={index}>
                      {(item.unitPrice * item.quantity).toLocaleString()}원
                      {index < cartItems.length - 1 && ' + '}
                    </span>
                  ))}
                {' = '}
                <strong>{totalPrice?.toLocaleString()}원</strong>
              </div>
            </div>
          </div>
          <input type='radio' name='agree' value='agree' />
          결제정보를 확인하였으며, 구매진행에 동의합니다.
          <button type='submit'>결제하기</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Orderpages;
