import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartTotal = ({ cart, onCheckout }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart && cart.items) {
      const price = cart.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
      setTotalPrice(price);
    }
  }, [cart]);

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
        <button className='checkout-btn' onClick={onCheckout}>
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
