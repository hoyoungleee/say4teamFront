import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Orderpages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AuthContext from '../context/UserContext';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, ORDER } from '../configs/host-config';

const Orderpages = () => {
  const { userInfo, isInit } = useContext(AuthContext);
  const location = useLocation();
  const { cartItems, totalPrice, cartItemIds } = location.state || {};

  const [emailAddress, setEmailAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [selectedOption, setSelectedOption] = useState('회원정보와동일시'); // 기본값 설정
  const navigate = useNavigate();

  useEffect(() => {
    if (isInit && userInfo && selectedOption === '회원정보와동일시') {
      setEmailAddress(userInfo.email || '');
      setAddress1(userInfo.address || '');
    }
  }, [userInfo, isInit, selectedOption]);

  const handleRadioChange = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);

    if (userInfo) {
      setEmailAddress(userInfo.email || '');
      setAddress1(
        selected === '회원정보와동일시' ? userInfo.address || '' : '',
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm('결제 하시겠습니까?');
    if (!isConfirmed) return;

    try {
      await axiosInstance.post(`${API_BASE_URL}${ORDER}/create`, {
        cartItemIds,
        // 새로운 배송지 선택 시 주소 전달, 아니면 빈 문자열 전달
        address: selectedOption === '새로운배송지' ? address1 : '',
      });

      alert('결제가 완료되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('주문 생성 실패:', err);
      alert('주문 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className='orderbigpage'>
        <p>Order</p>
        <form className='formbox' onSubmit={handleSubmit}>
          <div className='radio-row'>
            <label className='radio-option'>
              <input
                type='radio'
                name='inputadd'
                value='회원정보와동일시'
                checked={selectedOption === '회원정보와동일시'}
                onChange={handleRadioChange}
                required
              />
              <span>회원 정보와 동일</span>
            </label>
            <label className='radio-option'>
              <input
                type='radio'
                name='inputadd'
                value='새로운배송지'
                checked={selectedOption === '새로운배송지'}
                onChange={handleRadioChange}
              />
              <span>새로운 배송지</span>
            </label>
          </div>

          <div className='ordernamemain'>
            <label htmlFor='emailAddress'>이메일</label>
            <input
              type='email'
              id='emailAddress'
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
                {cartItems?.length === 1 ? (
                  // cartItems가 1개일 때
                  <strong>
                    {(
                      cartItems[0].unitPrice * cartItems[0].quantity
                    ).toLocaleString()}
                    원
                  </strong>
                ) : (
                  // cartItems가 여러 개일 때 (기존 로직 유지)
                  <>
                    {cartItems?.map((item, index) => (
                      <span key={index}>
                        {(item.unitPrice * item.quantity).toLocaleString()}원
                        {index < cartItems.length - 1 && ' + '}
                      </span>
                    ))}
                    {' = '}
                    <strong>{totalPrice?.toLocaleString()}원</strong>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='checkbox-confirm'>
            <input type='checkbox' required />
            <span>결제정보를 확인하였으며, 구매진행에 동의합니다.</span>
          </div>

          <div className='order-submit-wrapper'>
            <button type='submit'>결제하기</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Orderpages;
