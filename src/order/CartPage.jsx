import React from 'react';
import './CartPage.css';

const CartPage = () => {
  const cartItem = {
    name: 'Doodle Persian Rug A-type Yellow',
    price: 63000,
    quantity: 1,
    image: '/vite.svg', // 정적 파일은 public/assets/에 넣기
  };

  const totalPrice = cartItem.price * cartItem.quantity;

  return (
    <div className='cart-container'>
      <h2>Your cart</h2>
      <div className='cart-item'>
        <img src={cartItem.image} alt='product' className='cart-img' />
        <div className='cart-details'>
          <h3>{cartItem.name}</h3>
          <a href='#' className='delete-link'>
            Delete
          </a>
        </div>
        <div className='cart-summary'>
          <div className='quantity'>
            <p>Quantity</p> {/* p 태그를 quantity 내부로 이동 */}
            <button>-</button>
            <span>{cartItem.quantity}</span>
            <button>+</button>
          </div>
          <div className='price'>
            <p>Price</p>
            {cartItem.price.toLocaleString()}원
          </div>
        </div>
      </div>

      <hr />

      <div className='cart-total'>
        <div>
          <div>Price</div>
          <div>{cartItem.price.toLocaleString()}원</div>
        </div>
        <div className='total-row'>
          <div>Total</div>
          <div>{totalPrice.toLocaleString()}원</div>
        </div>
      </div>

      <div className='cart-buttons'>
        <button className='checkout-btn'>Check out</button>
      </div>
    </div>
  );
};

export default CartPage;
