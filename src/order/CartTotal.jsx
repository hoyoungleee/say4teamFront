import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartTotal = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // 총 합계 계산
  useEffect(() => {
    if (cart && cart.items) {
      const price = cart.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
      setTotalPrice(price);
    }
  }, [cart]);

  // Checkout 버튼 클릭 시 OrderPage로 이동, 상품 정보도 함께 전달
  const handleCheckout = () => {
    navigate('/order', { state: { cartItems: cart.items, totalPrice } }); // 상품 정보와 총 가격을 state로 전달
  };

  return (
    <div className='cart-total'>
      <div>
        <div>Price</div>
        <div>{totalPrice.toLocaleString()}원</div>
      </div>
      <div className='total-row'>
        <div>Total</div>
        <div>{totalPrice.toLocaleString()}원</div>
      </div>

      <div className='cart-buttons'>
        <button className='checkout-btn' onClick={handleCheckout}>
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
