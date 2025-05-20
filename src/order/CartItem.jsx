import React from 'react';
import './CartPage.css';

const CartItem = ({
  item,
  onQuantityChange,
  onDelete,
  onSelect,
  isSelected,
}) => {
  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onQuantityChange(item.productId, newQuantity);
    } else {
      onDelete(item.productId);
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `${item.productName} 상품을 삭제하시겠습니까?`,
    );
    if (isConfirmed) {
      onDelete(item.productId);
    }
  };

  const handleSelectChange = (e) => {
    onSelect(item.productId, e.target.checked);
  };

  return (
    <div className='cart-item'>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={handleSelectChange}
      />
      <img src={item.imageUrl} alt={item.productName} className='cart-img' />
      <div className='cart-details'>
        <h3>{item.productName}</h3>
        <button onClick={handleDelete} className='delete-link'>
          Delete
        </button>
      </div>
      <div className='cart-summary'>
        <div className='quantity'>
          <p>Quantity</p>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <div className='price'>
          <p>Price</p>
          <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
