import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Orderpages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AuthContext from '../context/UserContext'; // 경로 확인
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, ORDER } from '../configs/host-config'; // 추가: API 상수 불러오기

const Orderpages = () => {
  const { userInfo, isInit } = useContext(AuthContext);
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  const [emailAddress, setEmailAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const navigate = useNavigate();

  // userInfo 변경 시 자동으로 값 설정
  useEffect(() => {
    if (isInit && userInfo) {
      console.log('userInfo.address:', userInfo.address); // 이거 추가해보세요
      setEmailAddress(userInfo.email || '');
      setAddress1(userInfo.address || '');
    }
  }, [userInfo, isInit]);

  const handleRadioChange = (e) => {
    const selected = e.target.value;
    if (selected === '회원정보와동일시') {
      setEmailAddress(userInfo?.email || '');
      setAddress1(userInfo?.address || '');
    } else {
      setEmailAddress('');
      setAddress1('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 결제 확인 메시지 띄우기
    const isConfirmed = window.confirm('결제 하시겠습니까?');

    if (!isConfirmed) {
      return; // 사용자가 취소하면 아무 일도 일어나지 않음
    }

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
      console.log('주문 생성 성공:', response.data);

      // 결제 완료 후 알림창 띄우고, 확인 누르면 메인 페이지로 이동
      alert('결제가 완료되었습니다.');
      navigate('/');
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
            onChange={handleRadioChange}
          />
          회원 정보와 동일
          <input
            type='radio'
            name='inputadd'
            value='새로운배송지'
            className='afterbox'
            onChange={handleRadioChange}
          />
          새로운 배송지
          <div className='ordernamemain'>
            <label htmlFor='emailAddress'>이메일</label>
            <input
              type='email'
              id='emailAddress'
              name='emailAddress'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div className='ordernummain'>
            <label htmlFor='address1'>주소</label>
            <input
              type='text'
              id='address1'
              name='address1'
              placeholder='기본 주소 (직접 입력)'
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
            />
          </div>
          <div className='ordertotalbox'>
            <p>주문 상품</p>
            {cartItems?.map((item, index) => (
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
                    총액: {(item.unitPrice * item.quantity).toLocaleString()}원
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
                {cartItems?.map((item, index) => (
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
          <input type='checkbox' required /> 결제정보를 확인하였으며, 구매진행에
          동의합니다.
          <button type='submit'>결제하기</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Orderpages;
