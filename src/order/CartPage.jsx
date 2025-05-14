import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../configs/axios-config';
import { API_BASE_URL, CART } from '../configs/host-config';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}${CART}/details`);
      console.log('Received Cart:', res.data);
      setCart(res.data);
    } catch (err) {
      console.error('장바구니 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className='cart-container empty-cart'>
        <h2>Your Cart</h2>
        <hr />
        <div className='empty-message'> Your Cart is Empty!</div>
        <hr />
      </div>
    );
  }

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}${CART}/items/${productId}`);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId !== productId),
      }));
    } catch (err) {
      console.error('상품 삭제 실패:', err);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    const item = cart.items.find((item) => item.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      await handleDelete(productId);
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}${CART}/items/${productId}/quantity`,
        { quantity: newQuantity },
      );

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((cartItem) =>
          cartItem.productId === productId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        ),
      }));
    } catch (err) {
      console.error('수량 변경 실패:', err);
      alert('수량 변경에 실패했습니다.');
    }
  };

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>

      {cart.items.map((item) => (
        <div className='cart-item' key={item.productId}>
          <img
            src={item.imageUrl}
            alt={item.productName}
            className='cart-img'
          />
          <div className='cart-details'>
            <h3>{item.productName}</h3>
            <button
              onClick={() => handleDelete(item.productId)}
              className='delete-link'
            >
              Delete
            </button>
          </div>
          <div className='cart-summary'>
            <div className='quantity'>
              <p>Quantity</p>
              <button onClick={() => handleQuantityChange(item.productId, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.productId, 1)}>
                +
              </button>
            </div>
            <div className='price'>
              <p>Price</p>
              {(item.unitPrice * item.quantity).toLocaleString()}원
            </div>
          </div>
        </div>
      ))}

      <hr />

      <div className='cart-total'>
        <div>
          <div>Price</div>
          <div>{totalPrice.toLocaleString()}원</div>
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
