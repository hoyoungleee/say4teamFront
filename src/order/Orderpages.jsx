import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 훅 import
import './Orderpages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Orderpages = () => {
  const [email, setEmail] = useState({
    id: '',
    domain: '',
    customDomain: '',
  });
  const [address1, setAddress1] = useState('');
  // const [address2, setAddress2] = useState('');

  // react-router-dom에서 전달된 state 받아오기
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {}; // state가 없으면 기본값 빈 객체

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

  const domainOptions = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'hanmail.net',
    '직접입력',
  ];

  return (
    <>
      <Header />
      <div className='orderbigpage'>
        <p>Order</p>
        <form className='formbox'>
          <input
            type='radio'
            name='inputadd'
            value='회원정보와동일시'
            className='inputpart'
          />
          회원 정보와 동일
          <input
            type='radio'
            name='inputadd'
            value='새로운배송지'
            className='inputpart afterbox'
          />
          새로운 배송지
          <div className='ordernamemain'>
            <label htmlFor='username' className='username'>
              이름
            </label>
            <input type='text' id='username' name='username' />
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
                <strong>{totalPrice.toLocaleString()}원</strong>
              </div>
            </div>
          </div>
          {/* 결제 정보 확인 체크 */}
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
