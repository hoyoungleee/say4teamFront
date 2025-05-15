import React, { useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, CART } from '../configs/host-config';
import './CartPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // 장바구니 정보 가져오는 함수
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}${CART}/details`);
      setCart(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // 페이지 로드 시 장바구니 정보 fetch
  useEffect(() => {
    fetchCart();
  }, []); // 첫 번째 렌더링 시에만 호출

  // // 장바구니가 비어 있을 경우 메시지 표시
  // if (loading) return <div>Loading...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <>
        <Header />
        <div className='cart-container empty-cart'>
          <h2>Your Cart</h2>
          <hr />
          <div className='empty-message'> Your Cart is Empty!</div>
          <hr />
        </div>
        <Footer />
      </>
    );
  }

  // 수량 변경 시 서버에 반영
  const handleItemQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleDelete(productId); // 수량이 0 이하이면 삭제
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}${CART}/items/${productId}/quantity`,
        { quantity: newQuantity },
      );

      // 장바구니 상태 업데이트
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      }));
    } catch (err) {
      alert('수량 변경에 실패했습니다.');
    }
  };

  // 상품 삭제 시 서버에 반영
  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}${CART}/items/${productId}`);

      // 장바구니 상태 업데이트
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId !== productId),
      }));
    } catch (err) {}
  };

  // 장바구니 페이지 렌더링
  return (
    <>
      <Header />
      <div className='cart-container'>
        <h2>Your Cart</h2>
        {cart.items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onQuantityChange={handleItemQuantityChange}
            onDelete={handleDelete}
          />
        ))}
        <hr />
        <CartTotal cart={cart} />
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
