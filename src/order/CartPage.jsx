import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../configs/axios-config'; // 올바른 임포트 방식
import { API_BASE_URL, CART } from '../configs/host-config';
import './CartPage.css'; // CSS 파일 임포트

const CartPage = () => {
  const [cart, setCart] = useState(null); // 장바구니 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 장바구니 조회 함수
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}${CART}/details`);
      console.log('Received Cart:', res.data); // 데이터가 제대로 오는지 확인
      setCart(res.data); // 장바구니 데이터 설정
    } catch (err) {
      console.error('장바구니 조회 실패:', err); // 오류 처리
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    fetchCart(); // 컴포넌트 마운트 시 장바구니 조회
  }, []);

  // 로딩 상태가 true일 경우 'Loading...' 텍스트 출력
  if (loading) return <div>Loading...</div>;

  // cart가 null이거나 cart.items가 없을 경우 처리
  if (!cart || !cart.items || cart.items.length === 0) {
    return <div>장바구니가 비어 있습니다.</div>;
  }

  // 개별 상품 삭제
  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}${CART}/items/${productId}`);
      // 상품 삭제 후, 상태 직접 갱신하여 UI 즉시 반영
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

    // 수량이 0 이하로 내려가면 상품을 삭제
    if (newQuantity <= 0) {
      await handleDelete(productId);
      return;
    }

    try {
      // 1. 장바구니 수량 업데이트
      await axiosInstance.post(`${API_BASE_URL}${CART}/items`, {
        productId,
        quantity: newQuantity,
      });

      // 2. 상품 서비스에서 재고 수량 업데이트
      // 수량이 변경된 만큼만 재고 수량을 업데이트
      const stockDifference = newQuantity - item.quantity; // 현재 수량과 변경된 수량 차이
      const res = await axiosInstance.put(
        `${API_BASE_URL}/product/updateQuantity`,
        {
          id: productId,
          stockQuantity: item.stockQuantity - stockDifference, // 차이만큼 재고 업데이트
        },
      );

      console.log('Stock updated', res.data); // 응답 확인

      // UI 갱신: 상품 수량 변경 후 상태 업데이트
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
    }
  };

  // 전체 가격 계산
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
